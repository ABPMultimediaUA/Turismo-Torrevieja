import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';


import { ViewChild} from '@angular/core';
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

import { Usuario}  from "../../interfaces/usuario.interface";
import { Tarea}  from "../../interfaces/tarea.interface";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, LogueadoService, UsuariosService, DatosUsuarioService, TareasService} from '../../services/index';
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


  // INterfaz tarea
  // id:number;
  // expediente_id:number;
  // nombre:string;
  // user_id:number;
  // terminado:boolean;
  // created_at:string;
  // updated_at:string;
  // deleted_at:string;
      ELEMENT_DATA: Tarea[];
      tareas:any[] = [];
      displayedColumns = ['select','id', 'expediente_id', 'nombre', 'user_id','terminado','created_at','updated_at'];
      dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      selection = new SelectionModel<Tarea>(true, []);

      @ViewChild(MatSort) sort: MatSort;
      @ViewChild(MatPaginator) paginator: MatPaginator;

        ngAfterViewInit() {
            console.log("entra en el sort ese");

          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.selection = new SelectionModel<Tarea>(true, []);
          console.log(this.dataSource.sort);
        }




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
        private _usuariosService:UsuariosService,
        private _tareasService:TareasService
      ) {
        this.logueadoService.comprobarLogueado();
        this.id= localStorage.identificador;

        //recoger las tareas del usuario
        // this._eventosService.getEventos("1")
        //   .subscribe( data =>{
        //     console.log(data);//la data del getHeroes
        //
        //     this.eventos= data.data;
        //
        //
        // this._tareasService.getTareas(this.id)
        //     .subscribe(
        //       tareas => {tareas.data.password="",   this.tareas = tareas.data, console.log(this.tareas)})




              this._tareasService.getTareas()
                .subscribe( data =>{
                  console.log(data);//la data del getHeroes

                  this.tareas= data.data;
                  console.log("array de tareas:");
                  console.log(this.tareas);
                  // interfaz tarea
                  // identificador:number;
                  // expediente:number;
                  // nombreTarea:string;
                  // usuario:number;
                  // finalizado:boolean;
                  // fechaCreacion:string;
                  // fechaActualizacion:string;
                  // fechaEliminacion:string;
                  //megapis
                  this.ELEMENT_DATA = this.tareas;
                  this.displayedColumns = ['select','identificador', 'expediente', 'nombreTarea', 'usuario','finalizado','fechaCreacion','fechaActualizacion'];
                  this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                  this.selection = new SelectionModel<Tarea>(true, []);
                  this.dataSource.sort = this.sort;
                  this.dataSource.paginator = this.paginator;
                  // // finalmegapis
                  //
                  //
                  //
                  // this.loading=false;
                  //
                  //
                  //
                  // for(let i=0;i<this.totalPaginas;i++)
                  // {
                  //   this.cantidadPagina.push(i);
                  // }
                  //
                  // if(this.eventos.length>(this.eventosPorPagina-1)){
                  //   for(let i=0;i<=(this.eventosPorPagina-1);i++)
                  //   {
                  //     this.eventosActuales.push(this.eventos[i]);
                  //   }
                  // }else{
                  //   for(let i=0;i<this.eventos.length;i++)
                  //   {
                  //     this.eventosActuales.push(this.eventos[i]);
                  //   }
                  // }

                })






        //recoger la info del usuario
        this._usuariosService.getUsuario(this.id)
            .subscribe( usuario => {usuario.data.password="",   this.usuario = usuario.data, console.log(this.usuario)})

        this.fechaCreacion=localStorage.fechaCreacion;
       }

  ngOnInit() {
  }
  openDialogEditarPerfil(){
     console.log(this.usuario);
     const dialogRef = this.dialog.open(EditarPerfilDialog, {
       height: '500px',
       width: '450px',
       data: { usuario: this.usuario , identificador:this.idNumber}
     });
  }


  // openDialogEliminar(row) {
  //   console.log(row);
  //
  //     const dialogRef = this.dialog.open(EliminarUsuarioDialog, {
  //       height: '200px',
  //       width: '450px',
  //       data: { row: row }
  //     });
  //
  //     // dialogRef.afterClosed().subscribe(result => {
  //     //   console.log(`Dialog result: ${result}`);
  //     // });
  //   }
  //
  // openDialogEditar(row){
  //  console.log(row);
  //  const dialogRef = this.dialog.open(EditarUsuarioDialog, {
  //    height: '600px',
  //    width: '450px',
  //    data: { row: row }
  //  });
  // }
  selectRow(row) {
   console.log(row);
   this.router.navigate(['/evento', row.identificador]);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;

    // console.log("isAllSelected() "+this.selection);
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
        console.log("masterToggle() "+this.selection);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
