import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficosComponent } from './graficos/graficos.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guards/admin.guard';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';


const childRoutes: Routes = [

  // Configuracion
  { path: '', component: DashboardComponent , data: { titulo: 'Dashboard' }},
  { path: 'perfil', component: PerfilComponent , data: { titulo: 'Perfil de usuario' }},
  { path: 'account-settings', component: AccountSettingsComponent , data: { titulo: 'Account Settings' }},
  
  // Herramientas
  { path: 'graficos', component: GraficosComponent , data: { titulo: 'Graficos' }},
  { path: 'progress', component: ProgressComponent , data: { titulo: 'Progress' }},
  { path: 'promesas', component: PromesasComponent , data: { titulo: 'Promesas' }},
  { path: 'rxjs', component: RxjsComponent , data: { titulo: 'RxJs' }},
  { path: 'buscar/:termino', component: BusquedaComponent , data: { titulo: 'Busqueda' }},

  // Mantenimientos:
  { path: 'hospitales', component: HospitalesComponent , data: { titulo: 'Mantenimento de hopitales' }},
  { path: 'medicos', component: MedicosComponent , data: { titulo: 'Mantenimento de médicos' }},
  { path: 'medico/:id', component: MedicoComponent , data: { titulo: 'Perfil de médico' }},

  // Rutas de Admin
  { path: 'usuarios',
    // canActivate: [ AdminGuard ],
    component: UsuariosComponent , data: { titulo: 'Mantenimento de usuarios' }},

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
