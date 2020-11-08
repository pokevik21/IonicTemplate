import { Component, OnInit, Input } from '@angular/core';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: ['./grafico-dona.component.css']
})
export class GraficoDonaComponent implements OnInit {

  @Input() leyenda = 'Sin leyenda';
  @Input() labels: Label[] = ['Sin datos'];
  @Input() data: SingleDataSet = [100] ;
  @Input() type: ChartType = 'doughnut';


  constructor() { }

  ngOnInit(): void {
  }

}
