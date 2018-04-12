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
    this._loginService.getEstadoLog().subscribe( res => { this.isLogged = res; });



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
    this._loginService.logout();
  }

  cerrarSesion(){
    this.router.navigate(['/login']);
  }

}
