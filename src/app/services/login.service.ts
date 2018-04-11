import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Http, Headers } from "@angular/http";
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  userLog = new BehaviorSubject<boolean>(this.hasToken());

  tokenURL:string="https://gvent.ovh/Prueba2_1/public/oauth/token";
  datosUsuarioURL:string="https://gvent.ovh/Prueba2_1/public/quiensoy";

  constructor( private http:Http,
               private router:Router
             ) { }

  //Conocer si esta logueado o no el usuario
  getEstadoLog() : Observable<boolean> {
    return this.userLog.asObservable();
    // return this.userLog;
  }

  //Comprueba si se esta logueado, en caso de que no se este, devuelve a la pagina home
  comprobarEstadoLog() : void{
    if(!this.userLog.getValue()){
      this.router.navigate(['home']);
    }
  }

  //Inicializa la variable userLog dependiendo de si ha iniciado sesion o no
  private hasToken():boolean {
    return !!localStorage.getItem('accesToken');
    //TODO Verificar el token y el usuario antes de devolver el booleano
    // let res = false;
    //   if(localStorage.getItem('accesToken') && localStorage.getItem('correo')){
    //
    //   }
    // return res;
  }

  //Iniciar sesion, se le passa por parametro un email y una contrasenya
  login(user_pass:any) : void {

    //Se obtiene el token
    this.getToken(user_pass).then(
      res => {
        if(typeof res != "string"){
          let resultado: any = {};
          resultado = res;
          localStorage.setItem("accesToken", resultado.access_token );

          //Con el token se obtiene el usuario, se guarda en localStorage y login pasa a true
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

                this.userLog.next(true);
                this.router.navigate(['perfil']);
              }
            });
        }
      });
  }

  //Vaciar localStorage y pasar login a false
  logout() : void {
    localStorage.removeItem('accesToken');
    localStorage.removeItem('identificador');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('apodo');
    localStorage.removeItem('correo');
    localStorage.removeItem('rol');
    localStorage.removeItem('esVerificado');
    localStorage.removeItem('fechaCreacion');

    this.userLog.next(false);
    this.router.navigate(['home']);
  }

  //Obtener el token con el email y el password del usuario
  getToken(user_pass:any){
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

  //Se obtiene el usuario a partir del token
  getUser(token){
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
