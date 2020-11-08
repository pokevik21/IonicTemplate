import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.scss'],
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTes().then( msg => {

      console.log('Temino!', msg);

    }).catch( error => {

        console.log('Error en la promesa', error);


       }
    );

 }

ngOnInit(): void {
}

contarTes(): Promise<boolean>{

  return new Promise<boolean> ( ( resolve, reject ) => {

    let contador = 0;

    const intervalo = setInterval( () => {
      contador += 1;
      console.log(contador);

      if (contador === 3) {
        resolve( true );
        clearInterval(intervalo);
      }
    }, 1000 );

  } );

}

}
