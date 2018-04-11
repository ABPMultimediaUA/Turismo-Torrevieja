import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';



import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import {AlertService } from '../../services/alert.service';
import { AlertService  } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private alertService: AlertService
      ) { }

  ngOnInit() {
  }






}
