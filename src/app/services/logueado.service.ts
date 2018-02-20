import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, Headers} from '@angular/http';
//ramon
import { Component, OnInit } from '@angular/core';

//import { Usuario }  from "../interfaces/usuario.interface";
import { Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AlertService, AuthenticationService, UsuariosService } from '../services/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
@Injectable()
export class LogueadoService {
  // datosLoginsURL:string="https://gvent.ovh/Prueba2_1/public/quiensoy";
  // datosLoginURL:string="https://gvent.ovh/Prueba2_1/public/quiensoy";
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;



estaLogueado:boolean;
  constructor(private _usuariosService:UsuariosService,
              private router:Router,
              private http:Http,
              private route:ActivatedRoute
              ) { }
// nuevoLogueado( usuario )
// {
//
//   let body = JSON.stringify( usuario );//Cambiar todos los valos de heroe a string
//   let headers = new Headers ({
//
//     'Content-Type':'application/json',
//     'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/quiensoy',
//     'Authorization': this.First_accessToken+this.Secound_accessToken,
//
//     //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
//   });
//   console.log("body. nuevologueado que quiero postear: "+body);
//   return this.http.post(  this.datosLoginsURL, body, { headers } )
//     .map( res=>{
//       console.log(localStorage.accesToken);
//       console.log(res.json());
//     (res: Response) => res.json();
//     })
// }
logueando(){
  this.estaLogueado=true;
  console.log(" log de this.estaLogueado en logueando():");
  console.log(this.estaLogueado);
  
  //aqui hay que guardar todo lo que viene por esta ruta
//  https://gvent.ovh/Prueba2_1/public/quiensoy
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
