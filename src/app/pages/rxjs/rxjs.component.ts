import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, filter, retry } from 'rxjs/operators';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss'],
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {

       this.suscription = this.regresaObserbable().pipe(
        retry(2)
       )
      .subscribe(
        num => console.log( 'subs', num ),
        error => console.log('Error', error),
        () => console.log('Obserbable terminó')

       );

   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('La pagina rxjs se ba ha cerrar');
    this.suscription.unsubscribe();

  }

  regresaObserbable(): Observable<any> {

    return new Observable( ( (obsever: Subscriber<any>) => {

      let contador = 0;

      const interval = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        };

        obsever.next(salida);

        if (contador === 3) {
          clearInterval(interval);
          obsever.complete();
        }

        // if (contador === 2) {
        //   // clearInterval(interval);
        //   obsever.error('Zocorrito');
        // }


      }, 1000 );


    })).pipe(
      map( resp => resp.valor),
      filter( (valor, index) => (valor % 2) === 1 )

    );
  }
}
