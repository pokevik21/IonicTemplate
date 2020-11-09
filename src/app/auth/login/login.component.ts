import { Component, OnInit, NgZone } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { ThrowStmt } from '@angular/compiler';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2 = null;

  loginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [Validators.required, Validators.email ]],
    password: ['', Validators.required],
    recordarme: [ Boolean(localStorage.getItem('recordarme')) || false],
  }) ;


  constructor( public router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) {
  }

  ngOnInit() {
    this.renderButton();
    // if (localStorage.getItem('token')) {
    //   // Mover al dashboard
    //   this.router.navigateByUrl('/');
    // }
  }


  ingresar( ) {

    this.usuarioService.login(this.loginForm.value)
      .subscribe( resp => {
        // console.log( resp);
        if (this.loginForm.get('recordarme').value){
          localStorage.setItem('email', this.loginForm.get('email').value );
          localStorage.setItem('recordarme', this.loginForm.get('recordarme').value );
        }else{
          localStorage.removeItem('email');
          localStorage.removeItem('recordarme');
        }

        // Mover al dashboard
        this.router.navigateByUrl('/');
        

      },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Error en login...',
            text: err.error.msg
          });
        } );
  }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      // onsuccess: this.onSuccess,
      // onfailure: this.onFailure
    });

    this.startApp();

  }

  attachSignin(element) {
    // console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(id_token).subscribe(
            resp => {
              // Mover al dashboard
              this.ngZone.run( () => {
                this.router.navigateByUrl('/');
              } );
            }
          );

        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }


  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));
  }

}
