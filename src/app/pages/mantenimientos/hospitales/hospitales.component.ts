import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from '../../../models/hospital.model';
import { Subscription } from 'rxjs';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedarService } from '../../../services/busquedar.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss'],
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTmp: Hospital[] = [];
  public cargando: boolean = true;

  public imgSubs: Subscription;

  constructor( private hospitalServece: HospitalService ,
               private modalImageService: ModalImagenService,
               private buscarService: BusquedarService
    ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarHospitales();
    

    this.imgSubs = this.modalImageService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe( img => this.cargarHospitales() );
  }


  cargarHospitales(){
    this.cargando = true;

    this.hospitalServece.cargarHospitales()
    .subscribe( hospitales => {
      this.hospitales = hospitales;
      this.hospitalesTmp = hospitales;
      this.cargando = false;
    } );
  }



  guardarCambios( hospital: Hospital ){
    console.log(hospital);


    this.hospitalServece.actualizarHospital( hospital._id, hospital.nombre )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', hospital.nombre, 'success' );
        });

  }

  eliminarHospital( hospital: Hospital ){

    this.hospitalServece.borrarHospital( hospital._id )
        .subscribe( resp => {
          Swal.fire( 'Borrado', hospital.nombre, 'success' );
          this.cargarHospitales();
        });

  }

  async abrirSweetAlert(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hopital',
      text: 'Ingrese en nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    if (value.length > 0) {
      this.hospitalServece.crearHospital( value )
          .subscribe( (resp: any) => {
            this.hospitales.push( resp.hospitalCreado );
          });
    }

  }


  abrirModal( hospital: Hospital ){
    this.modalImageService.abrirModal( 'hospitales', hospital._id, hospital.img  );
  }

  buscar( termino: any ){

    if (termino.length === 0){
      return this.hospitales = this.hospitalesTmp;
    }

    this.buscarService.buscar('hospitales', termino).subscribe(
      (resp: Hospital[]) => {
        this.hospitales = resp;
      }
    );

  }

}
