import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";

@Injectable()
export class ExpedienteService {

  //TOKEN
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;

  //CABECERA
  header = new Headers ({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
    'Authorization': this.First_accessToken+this.Secound_accessToken,
  });


  constructor( private http:Http ) { }

  //FUNCION QUE CREA LAS URL
  crearURL (tipo,id){
    let url = "https://gvent.ovh/Prueba2_1/public/";
    switch(tipo) {
      case 0:
          url += "expediente"
          break;
      case 1:
          url += "actividad"
          break;
      case 2:
          url += "tarea"
          break;
      case 3:
          url += "contrato"
          break;
      case 4:
          url += `DeExpediente/${id}/actividades`;
          break;
      case 5:
          url += `DeExpediente/${id}/tareas`;
          break;
      case 6:
          url += `DeExpediente/${id}/contratos`;
          break;
      default:
          console.log("No se ha especificado correctamente una URL.");
    }
    if(id>-1 && tipo <4) url+=`/${id}`;
    return url;
  }

  crearItem (tipo,id,_body){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id);
      let body = JSON.stringify( _body );
      let headers = this.header;
      this.http.post(url, body, { headers })
        .toPromise()
          .then( res => { resolve( res.json().data ); })
          .catch((err) => { console.log( err.toString() ); })
    });
    return promise;
  }

  getItem (tipo,id){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id);
      let headers = this.header;
      this.http.get(url, { headers })
        .toPromise()
          .then( res => { resolve( res.json().data ); })
          .catch((err) => { console.log( err.toString() ); })
    });
    return promise;
  }

  actualizarItem (tipo,id, _body){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id);
      let body = JSON.stringify( _body );
      let headers = this.header;
      this.http.put(url, body, { headers })
        .toPromise()
          .then( res => { resolve( res.json().data ); })
          .catch((err) => { console.log( err.toString() ); })
    });
    return promise;
  }

  eliminarItem (tipo,id){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id);
      let headers = this.header;
      this.http.delete(url, { headers })
        .toPromise()
          .then( res => { resolve( res.json().data ); })
          .catch((err) => { console.log( err.toString() ); })
    });
    return promise;
  }

}
