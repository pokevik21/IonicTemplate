import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
  //  temaUrl: 'assets/css/colors/default.css',
   dark: true,
   themeColor: 'blue'
  };


  constructor( @Inject(DOCUMENT) private document ){
    this.cargarAjuestes();
  }


  guardarAjustes() {
    // console.log('Guardado en el local storage');
    localStorage.setItem( 'ajustes', JSON.stringify(this.ajustes) );
  }


  cargarAjuestes() {
    if ( localStorage.getItem('ajustes') ){
      this.ajustes = JSON.parse( localStorage.getItem('ajustes') );
      // console.log('Cargado los ajustes');
    }
    this.aplicarTema();
  }

  aplicarTema( ){

    if ( this.ajustes.dark ){
      document.body.classList.add('dark');
    }else{
      document.body.classList.remove('dark');
    }

    this.guardarAjustes();

  }

}






interface Ajustes {
  // temaUrl: string;
  dark: boolean;
  themeColor: string;
}
