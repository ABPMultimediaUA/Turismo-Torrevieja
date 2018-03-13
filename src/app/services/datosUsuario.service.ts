import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class DatosUsuarioService {
  //Variable de instancia
  DatosUsuarioURL:string="https://gvent.ovh/Prueba2_1/public/quiensoy";
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;

  constructor(private http:Http) { }


  getDatosUsuario(token){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+token,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("papapapapapapapapapapapapapapapapapapapapaap");
    console.log( token);

      
      let url = this.DatosUsuarioURL;
      console.log("papapapapapapapapaffffffffffffffffffffffffffapapapapapapaap");
      console.log(url);
    return this.http.get(url, { headers })
      .map( res=>res.json());

  }
}
