import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProgressComponent } from './progress/progress.component';
// import { Grafica1Component } from './grafica1/grafica1.component';
// import { AccountSettingsComponent } from './account-settings/account-settings.component';
// import { PromesasComponent } from './promesas/promesas.component';
// import { RxjsComponent } from './rxjs/rxjs.component';
// import { AuthGuard } from '../guards/auth.guard';
// import { PerfilComponent } from './perfil/perfil.component';
// import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
// import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
// import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
// import { MedicoComponent } from './mantenimientos/medicos/medico.component';
// import { BusquedaComponent } from './busqueda/busqueda.component';
import { Routes, RouterModule } from '@angular/router';


const childRoutes: Routes = [
  // Principal
  { path: '', component: DashboardComponent , data: { titulo: 'Dashboard' }},
  // { path: 'progress', component: ProgressComponent , data: { titulo: 'Progress' }},
  // { path: 'grafica1', component: Grafica1Component , data: { titulo: 'Grafica 1' }},
  // { path: 'promesas', component: PromesasComponent , data: { titulo: 'Promesas' }},
  // { path: 'rxjs', component: RxjsComponent , data: { titulo: 'RxJs' }},
  // { path: 'account-settings', component: AccountSettingsComponent , data: { titulo: 'Account Settings' }},
  // { path: 'perfil', component: PerfilComponent , data: { titulo: 'Perfil de usuario' }},
  // { path: 'buscar/:termino', component: BusquedaComponent , data: { titulo: 'Busqueda' }},

  // // Mantenimientos:
  // { path: 'hospitales', component: HospitalesComponent , data: { titulo: 'Mantenimento de hopitales' }},
  // { path: 'medicos', component: MedicosComponent , data: { titulo: 'Mantenimento de médicos' }},
  // { path: 'medico/:id', component: MedicoComponent , data: { titulo: 'Perfil de médico' }},

  // // Rutas de Admin
  // { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent , data: { titulo: 'Mantenimento de usuarios' }},

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
