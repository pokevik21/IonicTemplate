import { LoginForm } from './../interfaces/login-form.interface';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import Swal from 'sweetalert2';
declare const gapi: any;


const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router,
               private ngZone: NgZone ) {

    this.googleInit();

  }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.usuario.uid || '';
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  guardarLocalStorage( token: string, menu: any ){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  validarToken(): Observable<boolean>{

    return this.http.get( `${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {

        const { email, google, img, nombre, role, uid } = resp.usuario;

        this.usuario = new Usuario( nombre, email, '', img, google, role, uid );
        this.guardarLocalStorage( resp.token, resp.menu );

        return true;
      } ),
      catchError( err => {
        console.log(err);
        return of(false);
      })
    );

  }

  googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '597580071942-k5u0q2b9b4fhl2qufn637lpr5t90ve5a.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    } );

  }

  crearUsuario( fromData: RegisterForm ) {

     return this.http.post( `${base_url}/usuarios`, fromData )
                .pipe(
                tap( (resp: any) => {
                  this.guardarLocalStorage( resp.token, resp.menu );
                } )
              );

  }

  actualizarUsuario( fromData: { email: string, nombre: string, role: string } ){

    fromData = {
      ... fromData,
      role: this.usuario.role
    };

    return this.http.put( `${base_url}/usuarios/${this.uid}`, fromData, this.headers );
  }

  guardarUsuario( usuario: Usuario ){
    return this.http.put( `${base_url}/usuarios/${usuario.uid}`, usuario, this.headers );
  }


  login( fromData: LoginForm ) {

    return this.http.post( `${base_url}/login`, fromData )
                .pipe(
                  tap( (resp: any) => {
                    this.guardarLocalStorage( resp.token, resp.menu );
                  } ),
                );

 }

 loginGoogle( token ) {

  return this.http.post( `${base_url}/login/google`, { token } )
              .pipe(
                tap( (resp: any) => {
                  this.guardarLocalStorage( resp.token, resp.menu );
                } )
              );

}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('login');
      });
    });

    this.router.navigateByUrl('login');

  }

  cargarUsuarios( desde: number = 0 ){

    const url = `${base_url}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuario>( url, this.headers)
            .pipe(
              map( resp => {
                const usuarios = resp.usuarios.map(
                  user => new Usuario(
                    user.nombre,
                    user.email,
                    '',
                    user.img,
                    user.google,
                    user.role,
                    user.uid
                  ));

                return {
                  total: resp.total,
                  usuarios
                };
              })
            );

  }


  eliminarUsuario( usuario: Usuario ){

    const url = `${base_url}/usuarios/${usuario.uid}`;

    return this.http.delete( url, this.headers);


  }


}
