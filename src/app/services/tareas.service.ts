import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Tarea }  from "../interfaces/tarea.interface";


@Injectable()
export class TareasService {

  proveedoresURL:string="https://gvent.ovh/Prueba2_1/public/tarea";

  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;

  constructor(private http:Http) { }


  getTareas(){
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    let url = this.proveedoresURL;
    return this.http.get(url, { headers })
        .map( res=>res.json());
  }

  getTarea(id:string){
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
    let url = `${this.proveedoresURL}/${id}`;
    return this.http.get(url, { headers })
      .map( res=>res.json());
  }

  nuevoTarea(tarea:Tarea){
      let body = JSON.stringify( tarea );
      let headers = new Headers ({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
        'Authorization': this.First_accessToken+this.Secound_accessToken,

      });
      return this.http.post(  this.proveedoresURL, body, { headers } )
        .map( res=>{
          console.log(localStorage.accesToken);
          console.log(res.json());
        (res: Response) => res.json();
        })

  }



  modificarTarea(tarea:Tarea,id:string){
    let body = JSON.stringify( tarea );
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
  let url = `${this.proveedoresURL}/${id}`;
  return this.http.put (url,body, { headers })
      .map( res=>{
        console.log(res.json());
        return res.json();
    })
  }


  borrarTarea( id:string){
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
      let url = `${this.proveedoresURL}/${id}`;
      return this.http.delete(url, { headers })
          .map(res => res.json())
    }

}
