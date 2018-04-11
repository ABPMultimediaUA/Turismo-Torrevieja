import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from "@angular/http";
import { Router } from '@angular/router';

@Injectable()

export class LoginService {

  private userLog = new BehaviorSubject<boolean>(this.hasToken());

  private tokenURL:string="https://gvent.ovh/Prueba2_1/public/oauth/token";
  private datosUsuarioURL:string="https://gvent.ovh/Prueba2_1/public/quiensoy";

  constructor( private http:Http,
               private router:Router
             ) { }

  //Inicializa la variable userLog dependiendo de si ha iniciado sesion o no
  private hasToken():boolean {
      return !!localStorage.getItem('accesToken');
  }

  //Iniciar sesion
  public login(user_pass:any) : void {

    this.getToken(user_pass).then(
      res => {
        if(typeof res != "string"){
          let resultado: any = {};
          resultado = res;
          // console.log(resultado.access_token);
          localStorage.setItem("accesToken", resultado.access_token );

          this.getUser(resultado.access_token).then(
            res => {
              if(typeof res != "string"){
                let resultado: any = {};
                resultado = res;
                localStorage.setItem("identificador", resultado.data.identificador);
                localStorage.setItem("nombreUsuario", resultado.data.nombreUsuario);
                localStorage.setItem("apodo", resultado.data.apodo);
                localStorage.setItem("correo", resultado.data.correo);
                localStorage.setItem("rol", resultado.data.rol);
                localStorage.setItem("esVerificado", resultado.data.esVerificado);
                localStorage.setItem("fechaCreacion", resultado.data.fechaCreacion);
                localStorage.setItem("loggedIn", "true");

                this.userLog.next(true);
                this.router.navigate(['perfil']);
              }
            });
        }
      });
  }

  public logout() : void {
    localStorage.removeItem('accesToken');
    localStorage.removeItem('identificador');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('apodo');
    localStorage.removeItem('correo');
    localStorage.removeItem('rol');
    localStorage.removeItem('esVerificado');
    localStorage.removeItem('fechaCreacion');
    localStorage.removeItem('loggedIn');

    this.userLog.next(false);
  }

  //Conocer si esta logueado o no el usuario
  public getEstadoLog() : Observable<boolean> {
    return this.userLog.asObservable();
  }

  //Obtener el token con el email y el password del usuario
  private getToken(user_pass:any){
    let promise = new Promise((resolve, reject) => {
      let url = this.tokenURL;
      this.http.post(url,
        {
          "grant_type":"password",
          "client_id":"17",
          "client_secret":"g8t970BjbeZiTccFLCD3zOkYyhrl7CGEXJEJUmx9",
          "username":user_pass.email,
          "password":user_pass.password,
        })
        .toPromise()
          .then(  (res) => { resolve( res.json() ); },
                  (err) => { resolve( err.toString() )}
          )
    });
    return promise;
  }

  private getUser(token){
    let promise = new Promise((resolve, reject) => {
      let url = this.datosUsuarioURL;
      let headers = new Headers ({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
        'Authorization': "Bearer "+token,
      });
      this.http.get(url, { headers })
        .toPromise()
          .then(  (res) => { resolve( res.json() ); },
                  (err) => { resolve( err.toString() )}
          )
    });
    return promise;
  }

}
