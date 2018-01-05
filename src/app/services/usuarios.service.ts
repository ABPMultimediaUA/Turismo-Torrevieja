import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Usuario }  from "../interfaces/usuario.interface";
import 'rxjs/Rx';

@Injectable()
export class UsuariosService {

  heroesURL:string="https://gvent.ovh/Prueba2_1/public/user";
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;
  constructor( private http:Http ) { }

  nuevoHeroe( heroe:Usuario )
  {

    let body = JSON.stringify( heroe );//Cambiar todos los valos de heroe a string
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });

    return this.http.post(  this.heroesURL, body, { headers } )
      .map( res=>{
        console.log(localStorage.accesToken);
        console.log(res.json());
      (res: Response) => res.json();
      })
  }

}
