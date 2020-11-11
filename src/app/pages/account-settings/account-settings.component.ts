import { Component, OnInit, ElementRef, ViewContainerRef } from '@angular/core';
import { SettingsService } from '../../services/settings/settings.service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {

  darkMode: boolean = this.settingsService.ajustes.dark;
  public toggle = false;

  public rgbaText = 'rgba(165, 26, 214, 0.2)';

  public colorList = [
    { key: 'flame', value: '#e45a33', friendlyName: 'Flame' },
    { key: 'orange', value: '#fa761e', friendlyName: 'Orange' },
    { key: 'infrared', value: '#ef486e', friendlyName: 'Infrared' },
    { key: 'male', value: '#4488ff', friendlyName: 'Male Color' },
    { key: 'female', value: '#ff44aa', friendlyName: 'Female Color' },
    { key: 'paleyellow', value: '#ffd165', friendlyName: 'Pale Yellow' },
    { key: 'gargoylegas', value: '#fde84e', friendlyName: 'Gargoyle Gas' },
    { key: 'androidgreen', value: '#9ac53e', friendlyName: 'Android Green' },
    { key: 'carribeangreen', value: '#05d59e', friendlyName: 'Carribean Green' },
    { key: 'bluejeans', value: '#5bbfea', friendlyName: 'Blue Jeans' },
    { key: 'cyancornflower', value: '#1089b1', friendlyName: 'Cyan Cornflower' },
    { key: 'warmblack', value: '#06394a', friendlyName: 'Warm Black' },
  ];

  public presetValues: string[] = [];

  public selectedColor = 'color1';

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);

  constructor(
    private settingsService: SettingsService,
    private elementRef: ElementRef,
    public vcRef: ViewContainerRef,
    private cpService: ColorPickerService) {
    this.presetValues = this.getColorValues();
  }

  ngOnInit() {
    // document.documentElement.style
  }

  getColorValues() {
    return this.colorList.map(c => c.value);
  }


  public onEventLog(event: string, data: any): void {
    console.log(event, data);
  }

  public onChangeColorCmyk(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);

      return this.cpService.rgbaToCmyk(rgba);
    }

    return new Cmyk(0, 0, 0, 0);
  }

  public onChangeColorHex8(color: string): string {
    const hsva = this.cpService.stringToHsva(color, true);

    if (hsva) {
      return this.cpService.outputFormat(hsva, 'rgba', null);
    }

    return '';
  }

  toggleDarkMode = () => {
    this.settingsService.ajustes.dark = !this.settingsService.ajustes.dark;
    this.settingsService.aplicarTema();
  }

}
