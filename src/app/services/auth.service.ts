import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Http, Headers } from "@angular/http";
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  userLog = new BehaviorSubject<boolean>(this.hasToken());

  //TOKEN
  First_accessToken:string="Bearer ";
  Second_accessToken:string;

  urlBase:string = 'https://gvent.ovh/Prueba2_1/public/';

  //DATOS USUARIO
  user = new BehaviorSubject<any>(undefined);
  userPermisos:number[] = [];


  constructor( private http:Http,private router:Router ){
   if(localStorage.getItem('accesToken')) this.Second_accessToken = localStorage.getItem('accesToken');
   if(localStorage.getItem('user')) this.user.next(localStorage.getItem('user'));
   console.log("MOSTRANDO LOCAL STORAGE USER")
   console.log(JSON.parse(localStorage.getItem('user')))
 }

  //Confirma si se tiene dicho permiso
  tienePermiso(i:number) : boolean{
    let r = false;
    if(this.userPermisos.indexOf(i) != -1) r = true;
    return r;
  }

  //Conocer si esta logueado o no el usuario
  getEstadoLog() : Observable<boolean> {
    return this.userLog.asObservable();
  }

  //TODO eliminar
  //Comprueba si se esta logueado, en caso de que no se este, devuelve a la pagina home
  // comprobarEstadoLog() : boolean{
  //   if(this.userLog && this.userLog.getValue()){
  //     this.getUser();
  //     return true;
  //   }
  //   else{
  //     this.logout(0);
  //     return false;
  //   }
  // }

  //Inicializa la variable userLog dependiendo de si ha iniciado sesion o no
  private hasToken():boolean {
    return (!!localStorage.getItem('accesToken') && !!localStorage.getItem('user'));
  }

  /*** FUNCIONES LOGIN ***/
  //Iniciar sesion, se le pasa por parametro un email y una contrasenya
  //Primero se obtiene el token, despues el usuario, por ultimo se guardan los permisos
  login(user_pass:any) : void {
    this.getToken(user_pass).then(
      res => {
        if(typeof res != "string"){
          let resultado: any = {};
          resultado = res;
          localStorage.setItem("accesToken", resultado.access_token );
          this.Second_accessToken = resultado.access_token;
          this.getUser().then(
            res => {
              if(typeof res != "string"){
                this.userLog.next(true);
                this.router.navigate(['perfil']);
              }
            });
        }
      });
  }

  getToken(user_pass:any){
    let promise = new Promise((resolve, reject) => {
      let url = this.urlBase + 'oauth/token';
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

  getUser(){
    let promise = new Promise((resolve, reject) => {
      let url = this.urlBase + 'quiensoy';
      let headers = new Headers ({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
        'Authorization': this.First_accessToken+this.Second_accessToken,
      });
      this.http.get(url, { headers })
        .toPromise()
          .then(
            (res) => {
              let r = res.json().data;
              delete r.password;
              localStorage.setItem('user', JSON.stringify(r));
              this.user.next(r);
              this.getPermisosUser(r.rol);
              resolve( r );
            },
            (err) => { resolve( err.toString() )}
          )
    });
    return promise;
  }

  getPermisosUser(rol:number){
    let promise = new Promise((resolve, reject) => {
      let url = this.urlBase + `rols/${rol}/permisos`;
      let headers = new Headers ({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
        'Authorization': this.First_accessToken+this.Second_accessToken,
      });
      this.http.get(url, { headers })
        .toPromise()
          .then(
            (res) => {
              this.userPermisos = res.json().data.map(function(obj){
                var rObj = {};
                rObj = obj.identificador;
                return rObj;
              });
              resolve( res.json() );
            },
            (err) => { resolve( err.toString() )}
          )
    });
    return promise;
  }
  /*** FIN FUNCIONES LOGIN ***/

  /*** FUNCIONES LOGOUT ***/
  //Limpiar variables y pasar login a false
  logout(i:number) : void {
    this.limpiarDatosUsuario();
    this.userLog.next(false);
    if(i == 0) this.router.navigate(['home']);
    else if(i == 1) this.router.navigate(['login']);
  }

  //Cuando se cierre sesion
  limpiarDatosUsuario(){
    this.user.next(undefined);
    this.userPermisos = [];
    localStorage.removeItem("accesToken");
    localStorage.removeItem("user");
  }
  /*** FIN FUNCIONES LOGOUT ***/

}
