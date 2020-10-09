import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email ]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [ false, Validators.required],

  }, {
    validators: this.passwordsIguales( 'password', 'password2' )
  }
  );

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router ) { }

  ngOnInit() {}

  crearUsuario(){
    this.formSubmitted = true;
    // console.log(this.registerForm.value);

    if (this.registerForm.invalid) { return; }

    // Realizar el posteo
    this.usuarioService
      .crearUsuario(this.registerForm.value)
      .subscribe( (resp) => {
         // Mover al dashboard
         this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en registro...',
          text: err.error.msg
        });
      } );

  }

  campoNoValido( campo: string ){
    return (this.registerForm.get(campo).invalid && this.formSubmitted);
  }

  contrasenasNoValidas(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    return (pass1 !== pass2) && this.formSubmitted;

  }

  passwordsIguales( pass1: string, pass2: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true });
      }

    };

  }

  aceptaTerminos() {
    return !this.registerForm.get( 'terminos' ).value && this.formSubmitted;
  }

}
