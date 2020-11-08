import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages.routes';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CompentsModule } from '../components/compents.module';
import { GraficosComponent } from './graficos/graficos.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AccountSettingsComponent,
    GraficosComponent,
    ProgressComponent,
    PromesasComponent,
    RxjsComponent,
    HospitalesComponent,
    MedicosComponent,
    UsuariosComponent,
    PagesComponent,
    PerfilComponent
  ],
  exports: [
  ],
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    BrowserModule,
    SharedModule,
    PagesRoutingModule,
    CompentsModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class PagesModule { }
