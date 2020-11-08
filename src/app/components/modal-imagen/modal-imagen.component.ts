import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;
  public imgTmp: any;

  constructor( public modalImagenService: ModalImagenService,
               private fileUploatSer: FileUploadService ) {
               }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.modalImagenService.cerrarModal();
    this.imgTmp = null;
  }


  cambiarImagen( file: File ){
    this.imagenSubir = file;

    if (!file) {
      return this.imgTmp = null;
     }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTmp = reader.result;

    };


  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo  = this.modalImagenService.tipo;

    this.fileUploatSer
      .atualizarFoto(this.imagenSubir, tipo, id)
      .then( img => {

        Swal.fire({
          icon: 'success',
          title: 'Guardado',
          text: 'La imagen actualizada'
        });

        this.modalImagenService.nuevaImagen.emit(img);
        this.cerrarModal();

      }).catch( err => {

        console.log(err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se puede subir la imagen'
        });

      });

  }

}
