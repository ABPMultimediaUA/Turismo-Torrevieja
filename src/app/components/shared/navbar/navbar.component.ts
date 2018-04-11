import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginService } from '../../../services/index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../app.component.css'],
  // providers:[ LoginService ]
})

export class NavbarComponent implements OnInit {

  isLogged:boolean;

  identificador:number = 0;
  nombreUsuario:string = "";
  apodo:string = "";
  correo:string = "";
  esVerificado:number =0;
  rol:number =0;
  fechaCreacion:string = "";
  // permisos:string[] = [];

  constructor(  private router: Router,
                public _loginService:LoginService,
             )
  {
    // this.isLogged = _loginService.getEstadoLog();


    this.identificador=localStorage.identificador;
    this.nombreUsuario=localStorage.nombreUsuario;
    this.apodo=localStorage.apodo;
    this.correo=localStorage.correo;
    this.esVerificado=localStorage.esVerificado;
    this.rol=localStorage.rol;
    this.fechaCreacion=localStorage.fechaCreacion;
  }

  ngOnInit() {
    this._loginService.getEstadoLog().
      subscribe(
        res => {
          this.isLogged = res;
      });
  }

  logout(){
    this._loginService.logout();
  }

  cerrarSesion(){
    this.limpiarLocalStorage();
    this.router.navigate(['/login']);
  }


  //TODO COMPROBAR SI ELIMINAR O NO
  limpiarLocalStorage(){
    localStorage.loggedIn=false;

    delete localStorage.loggedIn;
    delete localStorage.accesToken;
    delete localStorage.identificador;
    delete localStorage.nombreUsuario;
    delete localStorage.apodo;
    delete localStorage.correo;
    delete localStorage.rol;
    delete localStorage.esVerificado;

    //Borrar cookie
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  login(){
    this._loginService.login(null);
  }

}
