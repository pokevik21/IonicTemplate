import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {

  darkMode: boolean = this.settingsService.ajustes.dark;

  constructor( private settingsService: SettingsService ) { }

  ngOnInit() {}

  toggleDarkMode = () => {
    this.settingsService.ajustes.dark = !this.settingsService.ajustes.dark;
    this.settingsService.aplicarTema();
  }

}
