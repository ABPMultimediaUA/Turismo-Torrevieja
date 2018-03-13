import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../../login/login.component';


import {HomeComponent} from "../../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { Usuario }  from "../../../interfaces/usuario.interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { Pipe, PipeTransform } from '@angular/core';


// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, LogueadoService, DatosUsuarioService, CarterasService} from '../../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
destino: string;

identificador:number = 0;
nombreUsuario:string = "";
apodo:string = "";
correo:string = "";
esVerificado:number =0;
rol:number =0;
fechaCreacion:string = "";

carterasnav:any= [];
carterasnav2:any= [];
obj:any;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private home:HomeComponent,
        public  logueadoService: LogueadoService,
        public  _carterasservice: CarterasService
        ) {
          this.logueadoService.comprobarLogueado();
          console.log("AUN NO TENEMOS LAS CARTERAS");
          this._carterasservice.getCarterasNav('1'). //falta hacer el susbribe data y data.data
          subscribe( data =>{
          console.log(data); //la data del getcarterasnav
            this.carterasnav= data.data;

            console.log("array de carterasNAV DESPUES DE DATA.DATA:");
            console.log(this.carterasnav);
        })

        this._carterasservice.getCarterasNav('2'). //falta hacer el susbribe data y data.data
        subscribe( data =>{
        console.log(data); //la data del getcarterasnav
          this.carterasnav2= data.data;

          console.log("array de carterasNAV DESPUES DE DATA.DATA:");
          console.log(this.carterasnav2);
      })

          console.log("YA TENEMOS LAS CARTERAAAAAAAAAAAAAS");

          console.log(this.carterasnav);

          console.log("FIN DEL CONSOLE DE LAS CARTERAS");
          console.log("YA TENEMOS LAS CARTERAAAAAAAAAAAAAS 22222222");

          console.log(this.carterasnav2);

          console.log("FIN DEL CONSOLE DE LAS CARTERAS 2222222222");
          this.identificador=localStorage.identificador;
          this.nombreUsuario=localStorage.nombreUsuario;
          this.apodo=localStorage.apodo;
          this.correo=localStorage.correo;
          this.esVerificado=localStorage.esVerificado;
          this.rol=localStorage.rol;
          this.fechaCreacion=localStorage.fechaCreacion;
         }

  ngOnInit() {

  }



  logout(){

    this.logueadoService.logouteando();



    console.log(localStorage.loggedIn);
    localStorage.loggedIn=false;
    console.log(localStorage.loggedIn);
    delete localStorage.loggedIn;
    console.log("loggedin despues del delete:")
    console.log(localStorage.loggedIn);
      // console.log(document.getElementById("verUsuarios").style);

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
    //Terminar de borrar cookie


      this.router.navigate(['/home']);


    //localStorage.removeItem(accessToken);

    //console.log("logueado: "+this.logueado);

    // document.getElementById("logout").style.display="none";
    // document.getElementById("login").style.display="inline";


  }

  cerrarSesion(){

    this.logueadoService.logouteando();



    console.log(localStorage.loggedIn);
    localStorage.loggedIn=false;
    console.log(localStorage.loggedIn);
    delete localStorage.loggedIn;
    console.log("loggedin despues del delete:")
    console.log(localStorage.loggedIn);
      // console.log(document.getElementById("verUsuarios").style);

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
    //Terminar de borrar cookie


      this.router.navigate(['/login']);


    //localStorage.removeItem(accessToken);

    //console.log("logueado: "+this.logueado);

    // document.getElementById("logout").style.display="none";
    // document.getElementById("login").style.display="inline";
}


}
