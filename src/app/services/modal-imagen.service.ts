import { Injectable, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { ModalImagenComponent } from '../components/modal-imagen/modal-imagen.component';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private OcultarModal: boolean = true;
  public tipo: 'usuarios'|'medicos'|'hospitales';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this.OcultarModal;
  }

  constructor( public modalController: ModalController  ) { }

  async abrirModal(
      tipo: 'usuarios'|'medicos'|'hospitales',
      id: string,
      img: string = 'no-img'
  ){
    // this.OcultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;

    if (img.includes('https')) {
      this.img = img;
    }else {
      this.img = `${ base_url }/upload/${ tipo }/${ img }`;
    }

    const modal = await this.modalController.create({
      component: ModalImagenComponent,
    });

    return await modal.present();

  }

  cerrarModal(){
    this.modalController.dismiss({
      dismissed: true
    });
  }


}
