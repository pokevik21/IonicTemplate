import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public selectedIndex = '';
  public menus = [
  { title: 'Configuracion',
    submenu: [
    {
      title: 'Dashboard',
      url: '/app',
      icon: 'speedometer-outline'
    },
    {
      title: 'Perfil',
      url: '/app/perfil',
      icon: 'person-circle-outline'
    },
    {
      title: 'Ajustes',
      url: '/app/account-settings',
      icon: 'settings-outline'
    }
    ]
  },
  {
    title: 'Herramientas',
    submenu: [
      {
        title: 'Graficos',
        url: '/app/graficos',
        icon: 'stats-chart-outline'
      },
      {
        title: 'Progress',
        url: '/app/progress',
        icon: 'battery-half-outline'
      },
      {
        title: 'Promesas',
        url: '/app/promesas',
        icon: 'pulse-outline'
      },
      {
        title: 'Rxjs',
        url: '/app/rxjs',
        icon: 'shapes-outline'
      }
    ]
  },
  {
    title: 'Mantenimiento',
    submenu: [
      {
        title: 'Usuarios',
        url: '/app/usuarios',
        icon: 'people-circle-outline'
      },
      {
        title: 'Medicos',
        url: '/app/medicos',
        icon: 'thermometer-outline'
      },
      {
        title: 'Hospitales',
        url: '/app/hospitales',
        icon: 'business-outline'
      }
    ]
  }
];

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
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
  }

  cambiarIndex( nums: number[] ){
    const index = `${nums[0]}${nums[1]}`;
    this.selectedIndex = index;
  }

  cargarIndex() {
    const path = window.location.pathname.split('app/')[1];

    if (path !== undefined) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.menus.length; i++) {
        const apartado = this.menus[i];
        const busqueda = (apartado.submenu.findIndex( menu => {
          const pathMenu = menu.url.split('app/')[1];
          // console.log(pathMenu);
          return path === pathMenu;
        }));

        if (busqueda >= 0) {
          this.selectedIndex = `${i}${busqueda}`;
        }
      }
    }else {
      this.selectedIndex = `00`;
    }
  }


}
