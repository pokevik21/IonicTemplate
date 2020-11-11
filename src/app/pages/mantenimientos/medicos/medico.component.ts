import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { Hospital } from '../../../models/hospital.model';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss'],
})
export class MedicoComponent implements OnInit {

  medicoForm: FormGroup;
  hospitales: Hospital[] =  [];

  hospitalSeleccionado: Hospital;
  medicoSel: Medico;

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activateRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.medicoForm = this.fb.group({
      nombre: [ '', Validators.required ],
      hospital: [ '', Validators.required ]
    });

    this.medicoForm.get('hospital').valueChanges
    .subscribe( hopitalId => {
      this.hospitalSeleccionado = this.hospitales.find( h => h._id === hopitalId );
    });

    this.cargarMedicoSel();
    this.cargarHospitales();
  }


  cargarMedicoSel(){

    let mid: string = '';
    this.activateRoute.params.subscribe( ({ id }) => mid = id);
    if (mid === 'nuevo') {return; }

    this.medicoService.getMedicoById( mid )
        .pipe( delay(100))
        .subscribe( medico => {

          this.medicoSel = medico;

          const nombre = medico.nombre;
          let _ID = '';
          try { _ID = medico.hospital._id; } catch (error) { }

          this.medicoForm.setValue({ nombre, hospital: _ID });
        }, err => this.router.navigateByUrl(`/app/medicos`) );

  }

  guardarMedico() {

    const { nombre } = this.medicoForm.value;

    if (this.medicoSel) {
      // Actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSel._id
      };

      this.medicoService.actualizarMedico(data)
          .subscribe( resp => {
            Swal.fire( 'Actualizado', `${ nombre } fue Actualizado`, 'success' );
            this.router.navigateByUrl('/app/medicos');
          });


    }else {
      // Crear

      this.medicoService.crearMedico( this.medicoForm.value )
          .subscribe( (resp: any) => {
            Swal.fire( 'Creado', `${ nombre } fue crado`, 'success' );
            this.router.navigateByUrl(`/app/medico/${ resp.medicoCreado._id }`);
          } );
    }

  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
        .subscribe( (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
        });
  }
}
