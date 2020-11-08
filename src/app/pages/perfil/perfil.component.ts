import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTmp: any;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploatSer: FileUploadService ) {
                 this.usuario = usuarioService.usuario;
                }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email:  [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });
    

  }

  actualizarPerfil( ){
    
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
    .subscribe( () => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire({
        icon: 'success',
        title: 'Guardado',
        text: 'Los cambios fueron guardados'
      });

    }, (err) => {
      // console.log(err.error.msg);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.msg
      });

    });
  }

  cambiarImagen( file: File ){
    this.imagenSubir = file;

    if (!file) {
      return this.imgTmp = null;
     }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTmp = reader.result;

    };


  }

  subirImagen(){
    this.fileUploatSer
      .atualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then( img => {
        this.usuario.img = img;

        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'La imagen actualizada'

        }).catch( err => {

          console.log(err);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se puede subir la imagen'
          });

        } );

      } )  ;
  }

}
