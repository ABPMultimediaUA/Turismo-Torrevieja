import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../app.component.css']
})

export class NavbarComponent implements OnInit {

  private cambiarEstadoSesion(b){
    this.sesionIniciada = b;
  }
  private sesionIniciada:boolean;

  identificador:number = 0;
  nombreUsuario:string = "";
  apodo:string = "";
  correo:string = "";
  esVerificado:number =0;
  rol:number =0;
  fechaCreacion:string = "";
  // permisos:string[] = [];

  constructor( private router: Router,
               public change_detector: ChangeDetectorRef,
             )
  {
        if(localStorage.getItem('loggedIn') != null) this.sesionIniciada = true;
        else this.sesionIniciada = false;

        this.identificador=localStorage.identificador;
        this.nombreUsuario=localStorage.nombreUsuario;
        this.apodo=localStorage.apodo;
        this.correo=localStorage.correo;
        this.esVerificado=localStorage.esVerificado;
        this.rol=localStorage.rol;
        this.fechaCreacion=localStorage.fechaCreacion;
  }

  ngOnInit() {
    if(localStorage.getItem('loggedIn') != null) this.sesionIniciada = true;
    else this.sesionIniciada = false;
  }

  logout(){
    this.limpiarLocalStorage();
    this.router.navigate(['/home']);
  }

  cerrarSesion(){
    this.limpiarLocalStorage();
    this.router.navigate(['/login']);
  }

  limpiarLocalStorage(){
    this.sesionIniciada = false;
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

  refresh(){
    this.change_detector.detectChanges();
  }

}
