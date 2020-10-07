import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Page404Component } from './page404/page404.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { BreadcumsComponent } from './breadcums/breadcums.component';


@NgModule({
  declarations: [
    HeaderComponent,
    Page404Component,
    SidebarComponent,
    BreadcumsComponent
  ],
  exports: [
    HeaderComponent,
    Page404Component,
    SidebarComponent,
    BreadcumsComponent
  ],
  imports: [
    RouterModule,
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
  ],
})
export class SharedModule { }
