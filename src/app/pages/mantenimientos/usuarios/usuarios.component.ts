import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedarService } from '../../../services/busquedar.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTmp: Usuario[] = [];
  public desde: number = 0;
  public cargando = true;

  public imgSubs: Subscription;

  constructor( private usuarioService: UsuarioService,
               private buscarService: BusquedarService,
               private modalImageService: ModalImagenService ) { }



  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuario();

    this.imgSubs = this.modalImageService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( img => this.cargarUsuario() );
  }

  cargarUsuario( ){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe( ({total, usuarios}) => {
      this.totalUsuarios  = total;
      this.usuarios = usuarios;
      this.usuariosTmp = usuarios;
      // console.log(usuarios);
      this.cargando = false;
    });
  }

  cambiarPagina( valor: number ){
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    }else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }

    this.cargarUsuario();

  }

  buscar( termino: any ){

    if (termino.length === 0){
      return this.usuarios = this.usuariosTmp;
    }

    this.buscarService.buscar('usuarios', termino).subscribe(
      (resp: Usuario[]) => {
        this.usuarios = resp;
      }
    );

  }

  eliminarUsuario( usuario: Usuario ){

    if (usuario.uid === this.usuarioService.uid ) {
      return Swal.fire(
        'Error!',
        'No puede borrarse a si mismo!',
        'error'
      );
    }


    Swal.fire({
      title: 'Estás seguro?',
      text: `Se borrará el usuario ${usuario.nombre}` ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.usuarioService.eliminarUsuario(usuario).subscribe(
          () => {

            this.cargarUsuario();

            Swal.fire(
              'Eliminado!',
              `El usuario ${ usuario.nombre } fue eliminado.`,
              'success'
            );

          }
         );

      }
    });

  }

  cambiarRole( usuario: Usuario ){
    this.usuarioService.guardarUsuario( usuario )
        .subscribe( (resp) => {
        }, err => {
          console.error(err);
        } );

  }


  abrirModal( usuario: Usuario ){
    this.modalImageService.abrirModal( 'usuarios', usuario.uid, usuario.img   );
  }


}
