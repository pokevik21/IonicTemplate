import { Injectable, Inject } from '@angular/core';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
   temaUrl: 'assets/css/colors/default.css',
   tema: 'default'
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
      this.aplicarTema( this.ajustes.tema );
      // console.log('Cargado los ajustes');
    }else {
      console.log('Usando ajuestes por defecto');
      this.aplicarTema( this.ajustes.tema );
    }
  }

  aplicarTema( tema: string ){

    const url = `assets/css/colors/${tema}.css`;
    this.document.getElementById('theme').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();

  }

}






interface Ajustes {
  temaUrl: string;
  tema: string;
}
