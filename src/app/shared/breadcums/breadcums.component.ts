import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ChildActivationEnd, ActivatedRouteSnapshot, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcums',
  templateUrl: './breadcums.component.html',
  styles: [
  ]
})
export class BreadcumsComponent implements OnInit, OnDestroy {

  titulo: string;
  tituloSub$: Subscription;

  constructor( private router: Router,
               private title: Title,
               private meta: Meta) {
    this.tituloSub$ = this.getDataRoute();
  }

  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getDataRoute() {

    return this.router.events
      .pipe(
          filter( evento => {
            // console.log(' Desde primer filtro ', evento);
            return evento instanceof ActivationEnd;
          } ),
          filter( (evento: ChildActivationEnd) => {
            // console.log(' Desde sugundo filtro ', evento );
            return evento.snapshot.data.titulo;
          } ),
          map ( (evento: ChildActivationEnd) => {
            // console.log(' Desde map filtro ', evento );
            return evento.snapshot.data;
          } )
       )
      .subscribe( data => {
        // console.log( ' Desde suscribe', data );
        this.titulo = data.titulo;
        this.title.setTitle(this.titulo);

        const metaTag: MetaDefinition = {
            name: 'descripcion',
            content: this.titulo
        };

        this.meta.updateTag(metaTag);

      });
  }

}
