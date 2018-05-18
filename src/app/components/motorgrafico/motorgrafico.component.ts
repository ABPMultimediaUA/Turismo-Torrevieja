import { Component, OnInit } from '@angular/core';

import * as motor from './MotorGrafico/index2.js';

@Component({
  selector: 'app-motorgrafico',
  templateUrl: './motorgrafico.component.html',
  styleUrls: ['./motorgrafico.component.css']
})
export class MotorgraficoComponent implements OnInit {

  constructor() { 
  	motor.InitDemo();
  	// setTimeout('dibujarEscana();animate();',300);
  }

  ngOnInit() {

  }

}
