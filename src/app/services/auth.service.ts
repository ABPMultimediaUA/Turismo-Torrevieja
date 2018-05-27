import { Injectable }                   from '@angular/core';
import { Observable, BehaviorSubject }  from 'rxjs/Rx';
import { Http, Headers }                from "@angular/http";
import { Router }                       from '@angular/router';
import { UsuarioInterface }             from '../interfaces/usuario.interface';
import { VentanaEmergentePreguntaComponent }    from '../components/ventana-emergente/ventana-emergente-pregunta.component';
import { MatDialog }                            from '@angular/material';

@Injectable()
export class AuthService {

  userLog = new BehaviorSubject<boolean>(this.estaLogueado());  //Usuario logueado o no
  logError = new BehaviorSubject<boolean>(false);  //Usuario logueado o no
  usuario:UsuarioInterface={                                    //Plantilla user para inicializar el BehaviorSubject
    identificador:-1,
    nombreUsuario:"",
    apodo:"",
    correo:"",
    password:"",
    password_confirmation:"",
    esVerificado:0,
    rol:-1,
    fechaActualizacion:"",
    fechaEliminacion:"",
    fechaCreacion:"",
    activo:null,
    observaciones:null
  };
  user = new BehaviorSubject<UsuarioInterface>(this.usuario);  //Datos del usuario
  userPermisos = new BehaviorSubject<number[]>([]);            //Permisos del usuario para comprobar restricciones

  First_accessToken:string="Bearer ";
  Second_accessToken:string;
  urlBase:string = 'https://gvent.ovh/Prueba2_1/public/';

  constructor( private http:Http, private router:Router, public dialog: MatDialog ){
    //Si hay sesion, guardamos todos los datos de las localStorage en sus variables
    if(localStorage.getItem('accesToken')) this.Second_accessToken = localStorage.getItem('accesToken');
    if(localStorage.getItem('user')) this.user.next(JSON.parse(localStorage.getItem('user')));
    if(localStorage.getItem('permisos')) this.userPermisos.next(JSON.parse(localStorage.getItem('permisos')));
  }

  //Inicializa la variable userLog dependiendo de si ha iniciado sesion o no
  private estaLogueado():boolean {
    return (!!localStorage.getItem('accesToken') && !!localStorage.getItem('user'));
  }

  //Conocer si esta logueado o no el usuario
  getEstadoLog() : Observable<boolean> {
    return this.userLog.asObservable();
  }

  //Confirma si se tiene dicho permiso
  tienePermiso(i:number) : boolean{
    // if(this.permisosBásicos.indexOf(i) != 1) return true;
    if(this.userPermisos && this.userPermisos.getValue())
      return this.userPermisos.getValue().indexOf(i) != -1;
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
                this.logError.next(false);
                localStorage.removeItem("navSelected");
                this.router.navigate(['entrada']);
              }
              else{
                this.logError.next(true);
              }
            });
        }
        else{
          this.logError.next(true);
        }
      })
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
              let r = res.json().data as UsuarioInterface;
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
              let per = res.json().data.map(function(obj){
                var rObj = {};
                rObj = obj.identificador;
                return rObj;
              });
              per.push(1,2,3,4, 9,10,11,12, 13,14,15,16, 17,18,19,20, 37,38,39,40, 41,42,43,44, 45,46,47,48,49,50,51,52,57);
              localStorage.setItem('permisos', JSON.stringify(per));
              this.userPermisos.next(per);
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
    const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
      height: '17em',
      width: '32em',
      data: { item: "Vas a cerrar sesión en GVENT.\n¿Continuar?" }
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.limpiarDatosUsuario();
        this.userLog.next(false);
        if(i == 0) this.router.navigate(['home']);
        else if(i == 1) this.router.navigate(['login']);
      }
    });
  }

  //Cuando se cierre sesion
  limpiarDatosUsuario(){
    this.user.next(this.usuario);
    this.userPermisos.next(undefined)
    localStorage.removeItem("accesToken");
    localStorage.removeItem("user");
    localStorage.removeItem("permisos");
    localStorage.removeItem("navSelected");
  }
  /*** FIN FUNCIONES LOGOUT ***/

  comprobarUsuario(token:string){
    let promise = new Promise((resolve, reject) => {
      let url = this.urlBase + 'quiensoy';
      let headers = new Headers ({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
        'Authorization': this.First_accessToken+token,
      });
      this.http.get(url, { headers })
        .toPromise()
          .then(
            (res) => {
              let r = res.json().data as UsuarioInterface;
              delete r.password;
              resolve( r.identificador );
            },
            (err) => { resolve( err.toString() )}
          )
    });
    return promise;
  }
}
