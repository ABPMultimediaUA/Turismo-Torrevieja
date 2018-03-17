import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';

import {MatTableDataSource, MatSort} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { MatPaginatorModule, MatPaginator } from '@angular/material';
import { MatIcon} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule, MatButtonModule } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { Usuario }  from "../../interfaces/usuario.interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, LogueadoService, UsuariosService, DatosUsuarioService} from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';

import {EditarPerfilDialog} from "./editar-perfil-dialog.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  idNumber:number;
  nombreUsuario:string = "";
  apodo:string = "";
  correo:string = "";
  esVerificado:number =0;
  rol:number =0;
  fechaCreacion:string = "";
  id:string;

  public usuario:Usuario={
    identificador:"",
    nombreUsuario:"",
    apodo:"",
    correo:"",
    password:"",
    password_confirmation:"",
    esVerificado:0,
    //key$?:string; identificador es la key
    rol:0
  };
  roles = [
    {value: '1', viewValue: 'Administrador'},
    {value: '2', viewValue: 'Trabajador'},
    {value: '4', viewValue: 'Otros'}
  ];

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private home:HomeComponent,
      public  logueadoService: LogueadoService,
        public dialog: MatDialog,
        private _usuariosService:UsuariosService
      ) {
        this.logueadoService.comprobarLogueado();

        // this.identificador=localStorage.identificador;
        // this.nombreUsuario=localStorage.nombreUsuario;
        // this.apodo=localStorage.apodo;
        // this.correo=localStorage.correo;
        // this.esVerificado=localStorage.esVerificado;
        // this.rol=localStorage.rol;
        this.id= localStorage.identificador;
        this._usuariosService.getUsuario(this.id)
            .subscribe( usuario => {usuario.data.password="",   this.usuario = usuario.data, console.log(this.usuario)})

        this.fechaCreacion=localStorage.fechaCreacion;
        //
        //
        // this.idNumber= parseInt(localStorage.identificador);
        // this.usuario.identificador=localStorage.identificador;
        // this.usuario.nombreUsuario=localStorage.nombreUsuario;
        // this.usuario.apodo=localStorage.apodo;
        // this.usuario.correo=localStorage.correo;
        // this.usuario.esVerificado=localStorage.esVerificado;
        // this.usuario.rol=localStorage.rol;

       }

  ngOnInit() {
  }
  openDialogEditarPerfil(usuario){
    // this.usuario.identificador=this.identificador;
    // this.usuario.nombreUsuario=this.nombreUsuario;
    // this.usuario.apodo=this.apodo;
    // this.usuario.correo=this.correo;


     console.log(this.usuario);
     const dialogRef = this.dialog.open(EditarPerfilDialog, {
       height: '500px',
       width: '450px',
       data: { usuario: this.usuario , identificador:this.idNumber}
     });
  }

}
