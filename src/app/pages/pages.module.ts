import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages.routes';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
