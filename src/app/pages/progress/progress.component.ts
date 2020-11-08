import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {

  progresoAzul = 50;
  progresoVerde = 30;

  constructor() { }

  ngOnInit() {}

}
