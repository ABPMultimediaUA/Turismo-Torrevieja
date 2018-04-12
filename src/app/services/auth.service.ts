import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Http, Headers } from "@angular/http";

@Injectable()
export class AuthService {

  //TOKEN
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;

  //CABECERA
  header = new Headers ({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
    'Authorization': this.First_accessToken+this.Secound_accessToken,
  });

  urlBasica:string = 'https://gvent.ovh/Prueba2_1/public/';

  //DATOS USUARIO
  userId = new BehaviorSubject<number>(-1);
  userNombre = new BehaviorSubject<string>('');
  userApodo = new BehaviorSubject<string>('');
  userCorreo = new BehaviorSubject<string>('');
  userRol = new BehaviorSubject<number>(-1);
  userVerificado = new BehaviorSubject<number>(-1);
  userFechaCreacion = new BehaviorSubject<string>('');
  userPermisos = new BehaviorSubject<any[]>([]);

  constructor( private http:Http,
             ) { }

  getUser(){
    let promise = new Promise((resolve, reject) => {
      let url = this.urlBasica + 'quiensoy';
      let headers = this.header;
      this.http.get(url, { headers })
        .toPromise()
          .then(
            (res) => {
              let r = res.json().data;
              this.userId.next(r.identificador);
              this.userNombre.next(r.nombreUsuario);
              this.userApodo.next(r.apodo);
              this.userCorreo.next(r.correo);
              this.userRol.next(r.rol);
              this.userVerificado.next(r.esVerificado);
              this.userFechaCreacion.next(r.fechaCreacion);
              this.getPermisosUser();
              resolve( res.json() );
            },
            (err) => { resolve( err.toString() )}
          )
    });
    return promise;
  }

  getPermisosUser(){
    let promise = new Promise((resolve, reject) => {
      let url = this.urlBasica + `rols/${this.userRol.getValue()}/permisos`;
      let headers = this.header;
      this.http.get(url, { headers })
        .toPromise()
          .then(
            (res) => {
              this.userPermisos.next(res.json().data);
              console.log(this.userPermisos.getValue()[1]); //TODO extraer solo los ID
              resolve( res.json() );
            },
            (err) => { resolve( err.toString() )}
          )
    });
    return promise;
  }

  //Cuando se cierre sesion desde LoginService
  limpiarDatosUsuario(){
    this.userId = new BehaviorSubject<number>(-1);
    this.userNombre = new BehaviorSubject<string>('');
    this.userApodo = new BehaviorSubject<string>('');
    this.userCorreo = new BehaviorSubject<string>('');
    this.userRol = new BehaviorSubject<number>(-1);
    this.userVerificado = new BehaviorSubject<number>(-1);
    this.userFechaCreacion = new BehaviorSubject<string>('');
    this.userPermisos = new BehaviorSubject<any[]>([]);
    localStorage.removeItem("accesToken");
  }

}
