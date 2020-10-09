import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menus: any = [];

  cargarMenu(){
    this.menus = JSON.parse(localStorage.getItem('menu')) || [] ;
  }


  constructor() { }
}
