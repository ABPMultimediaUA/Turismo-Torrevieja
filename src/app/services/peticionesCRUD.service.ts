import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment";

@Injectable()
export class PeticionesCrudService {

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
  crearURL (tipo,id,id2,pgn){
    let url = "https://gvent.ovh/Prueba2_1/public/";
    switch(tipo) {
      case 0:
          //Sin id muestra todos los items
          //Con id crud
          url += "expediente";
          break;
      case 1:
          //Sin id muestra todos los items
          //Con id crud
          url += "actividad";
          break;
      case 2:
          //Sin id muestra todos los items
          //Con id crud
          url += "tarea";
          break;
      case 3:
          //Sin id muestra todos los items
          //Con id crud
          url += "contrato";
          break;
      case 4:
          //Sin id muestra todos los items
          //Con id crud
          url += "rol";
          break;
      case 5:
          //Sin id muestra todos los items
          //Con id crud
          url += "user";
          break;
      case 6:
          //Sin id muestra todos los items
          //Con id crud
          url += "espacio";
          break;
      case 7:
          //Sin id muestra todos los items
          //Con id crud
          url += "proveedor";
          break;
      case 8:
          //Sin id muestra todos los items
          //Con id crud
          url += "cartera";
          break;
      case 101:
          //Todas las actividades de un expediente
          url += `DeExpediente/${id}/actividades`;
          break;
      case 102:
          //Todas las tareas de un expediente
          url += `DeExpediente/${id}/tareas`;
          break;
      case 103:
          //Todas los contratos de un expediente
          url += `DeExpediente/${id}/contratos`;
          break;
      case 104:
          //Todos los permisos de un id rol
          url += `rols/${id}/permisos`;
          break;
      case 105:
          //Insertar o eliminar a un id rol un permiso id2, utiliza put (actualizar)
          url += `rol/${id}/permiso/${id2}`;
          break;
      case 106:
          //Insertar o eliminar a un id rol un permiso id2, utiliza put (actualizar)
          url += `DeCartera/${id}/expedientes`;
          break;
      case 201:
          //Insertar imagen en expediente
          url += `expediente/${id}/?imagen`;
          break;
      default:
          console.log("No se ha especificado correctamente una URL.");
    }
    if(id>-1 && tipo <101) url+=`/${id}`;
    if(pgn>-1) url+= `/?page=${pgn}`;
    return url;
  }

  crearItem (tipo,_body){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,-1,-1,-1);
      let body = JSON.stringify( _body );
      console.log(body);
      let headers = this.header;
      this.http.post(url, body, { headers })
        .toPromise()
          .then( res => { resolve( res.json().data ); })
          .catch((err) => { console.log( err.toString() ); })
    });
    return promise;
  }

  getItem (tipo,id,id2,pgn){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id,id2,pgn);
      let headers = this.header;
      this.http.get(url, { headers })
        .toPromise()
          .then( res => { resolve( res.json().data ); })
          .catch((err) => { console.log( err.toString() ); })
    });
    return promise;
  }

  actualizarItem (tipo,id, _body, id2){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id,id2,-1);
      let body = JSON.stringify( _body );
      let headers = this.header;
      this.http.put(url, body, { headers })
        .toPromise()
          .then( res => { resolve( res.json().data ); })
          .catch((err) => { console.log( err.toString() ); })
    });
    return promise;
  }

  eliminarItem (tipo,id,id2){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id,id2,-1);
      let headers = this.header;
      this.http.delete(url, { headers })
        .toPromise()
          .then( res => { resolve( res.json().data ); })
          .catch((err) => { console.log( err.toString() ); })
    });
    return promise;
  }

  subirFile (tipo, id, file: File){
    // let promise = new Promise((resolve, reject) => {
    //   let url = this.crearURL(tipo,id,-1,-1);
    //   let formData: FormData = new FormData();
    //   formData.append('image', file);
    //   formData.append('_method','put');
    //   // console.log("cartera", formData.get('cartera_id'),url);
    //
    //   let headers = new Headers ({
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Cache-Control':'no-cache',
    //     'Accept':'image/*',
    //     // 'Content-Type': 'image/jpeg',
    //     // 'Content-Disposition':'form-data',
    //     'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
    //     'Authorization': this.First_accessToken+this.Secound_accessToken,
    //   });
    //   // headers.append('Accept','image/*');
    //   this.http.put(url, formData, { headers })
    //     .toPromise()
    //       .then( res => { resolve( res.json().data ); })
    //       .catch((err) => { console.log( err.toString() ); })
    // });
    // return promise;
  }

}
