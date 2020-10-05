import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routes';
import { AuthRoutingModule } from './auth/auth.router';
import { Page404Component } from './shared/page404/page404.component';

const routes: Routes = [
  
  // path: '/app' PagesRoutingModule
  // path: '/login' AuthRoutingModule

  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
