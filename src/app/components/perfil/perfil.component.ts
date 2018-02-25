import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';


import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { Usuario }  from "../../interfaces/usuario.interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, LogueadoService, DatosUsuarioService} from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  identificador:number = 0;
  nombreUsuario:string = "";
  apodo:string = "";
  correo:string = "";
  esVerificado:number =0;
  rol:number =0;
  fechaCreacion:string = "";



  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private home:HomeComponent,
      public  logueadoService: LogueadoService
      ) {
        this.logueadoService.comprobarLogueado();
          delete localStorage.vengoDe;
          // localStorage.setItem("mecagoEnDios", "poco");
          localStorage.setItem("vengoDe", "caca");
        this.identificador=localStorage.identificador;
        this.nombreUsuario=localStorage.nombreUsuario;
        this.apodo=localStorage.apodo;
        this.correo=localStorage.correo;
        this.esVerificado=localStorage.esVerificado;
        this.rol=localStorage.rol;
        this.fechaCreacion=localStorage.fechaCreacion;

       }

  ngOnInit() {
  }
  vengoDePerfil(){

    localStorage.setItem("vengoDe", "perfil");
  }
}
