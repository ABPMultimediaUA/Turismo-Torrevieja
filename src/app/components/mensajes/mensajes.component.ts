import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import {HomeComponent} from "../home/home.component";
import {NavbarComponent} from "../shared/navbar/navbar.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AuthenticationService, TokenService, LogueadoService} from '../../services/index';
// import { AlertComponent } from '../../_directives/index';
// import { AuthGuard } from '../../_guards/index';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
parametro:string = "mensaje de prueba";
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private token:TokenService,
      private navbar:NavbarComponent,
      private home:HomeComponent,
      private logueadoService: LogueadoService
    ) {
      this.logueadoService.comprobarLogueado();
     }

  ngOnInit() {
  }
  recogerParame(parame){
    this.parametro=parame;
  }
}
