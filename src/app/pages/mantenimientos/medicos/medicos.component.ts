import { Component, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { Subscription } from 'rxjs';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedarService } from '../../../services/busquedar.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss'],
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];
  public medicosTmp = [];

  public cargando = true;
  public imgSubs: Subscription;

  constructor( private medicoService: MedicoService,
               private modalImageService: ModalImagenService,
               private buscarService: BusquedarService,
               private router: Router
               ) { }


  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImageService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( img => this.cargarMedicos() );
  }

  cargarMedicos(){
    this.cargando = true;

    this.medicoService.cargarMedicos()
    .subscribe( medicos => {
      this.medicos = medicos;
      this.medicosTmp = medicos;
      this.cargando = false;
    } );
  }

  abrirModal( medico: Medico ){
    this.modalImageService.abrirModal( 'medicos', medico._id, medico.img  );
  }

  buscar( termino: any ){

    if (termino.length === 0){
      return this.medicos = this.medicosTmp;
    }

    this.buscarService.buscar('medicos', termino).subscribe(
      (resp: Medico[]) => {
        this.medicos = resp;
      }
    );

  }

  eliminarMedico( medico: Medico ){

    Swal.fire({
      title: 'Estás seguro?',
      text: `Se borrará el médico, ${medico.nombre}` ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.medicoService.borrarMedico(medico._id).subscribe(
          () => {
            Swal.fire( 'Borrado', medico.nombre, 'success' );
            this.cargarMedicos();
          }
        );

      }
    });

  }

  detalleMedico( medicoID: string ){
    this.router.navigateByUrl(`/app/medico/${medicoID}`);
  }

}
