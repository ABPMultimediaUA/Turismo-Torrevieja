import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../../login/login.component';


import {HomeComponent} from "../../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import {AlertService } from '../../services/alert.service';
import { AlertService } from '../../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {

  parametro:string = "pruebaaa";
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private alertService: AlertService,
      private home:HomeComponent,
      ) {

       }

  ngOnInit() {
  }

  recogerParametro(param){
    this.parametro=param;
  }
}
