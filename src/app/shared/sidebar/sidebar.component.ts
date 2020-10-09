import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from '../../services/usuario.service';
import { SidebarService } from '../../services/shared/sidebar.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  public selectedIndex = '';

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usuarioService: UsuarioService,
    public sidebarService: SidebarService,
  ) {
    this.initializeApp();
    this.sidebarService.cargarMenu();
    this.usuario = usuarioService.usuario;
   }

   openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.cargarIndex();
    console.log(this.usuario.imagenUrl);
  }

  cambiarIndex( nums: number[] ){
    const index = `${nums[0]}${nums[1]}`;
    this.selectedIndex = index;
  }

  cargarIndex() {
    const path = window.location.pathname;

    if (path !== undefined) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.sidebarService.menus.length; i++) {
        const apartado = this.sidebarService.menus[i];
        const busqueda = (apartado.submenu.findIndex( menu => {
          const pathMenu = menu.url;
          // console.log(pathMenu);
          return path === pathMenu;
        }));

        if (busqueda >= 0) {
          this.selectedIndex = `${i}${busqueda}`;
        }
      }
    }else {
      this.selectedIndex = '';
    }
  }

  logout(){
    this.usuarioService.logout();
  }

}
