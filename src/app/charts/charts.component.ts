import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

import {chart} from 'highcharts';
import * as Highcharts from 'highcharts';
import { BankDeposits } from '../bank-deposits';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
// Load the exporting module.


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor() { }

  @ViewChild('chartTarget') chartTarget: ElementRef;

  chart: Highcharts.ChartObject;

  options: Object;

  @Input() chartData : Object[];
  @Input() drillDownData : Object[];


  ngOnInit() {


    console.log(this.drillDownData)

    this.options = {
      xAxis : {
        type : 'Category'
      },
      yAxis : {
        title : {text : 'Amount'}
      },
      chart : {type : 'column'},
      title : { text : 'simple chart' },
      series: [{
        name: 'Portfolio',
        data: this.chartData
      }],
      drilldown : {
        series : this.drillDownData
      }
    };
     
    console.log("init")
    this.chart = chart(this.chartTarget.nativeElement,this.options);
    console.log('chart formed')
  }

}
