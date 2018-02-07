import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
//ramon
import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AlertService, AuthenticationService, UsuariosService } from '../services/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()

export class LogueadoService {

estaLogueado:boolean;
  constructor(private _usuariosService:UsuariosService,
              private router:Router,
              private route:ActivatedRoute
              ) { }

logueando(){
  this.estaLogueado=true;
  console.log(" log de this.estaLogueado en logueando():");
  console.log(this.estaLogueado);
}

logouteando(){
  this.estaLogueado=false;
  console.log(" log de this.estaLogueado en logouteando():");
  console.log(this.estaLogueado);
 //con local storage
 //console.log(localStorage.getItem('accesToken') != null);
}

comprobarLogueado(){
  console.log("hay loggedIn?:");
  console.log(localStorage.getItem('loggedIn') != null);
  if(localStorage.getItem('loggedIn') != null){
      this.estaLogueado=true;
  }else{
    this.estaLogueado=false;
  }


  return this.estaLogueado;
}


}
