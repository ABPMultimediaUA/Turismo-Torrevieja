import { Component, OnInit, Inject } from '@angular/core';
import { ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTableDataSource, MatSort} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { MatPaginatorModule, MatPaginator } from '@angular/material';
import { MatIcon} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LoginComponent} from '../login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule, MatButtonModule } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';

import { Element }  from "../../interfaces/element.interface";
import { UsuarioInterface }  from "../../interfaces/usuario.interface";
import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import {AlertService } from '../../services/alert.service';
import { AlertService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';
@Component({
  selector: 'editar-perfil-dialog',
  templateUrl: 'editar-perfil-dialog.html',
})
export class EditarPerfilDialog {
  row:UsuarioInterface;
  id:number;
  idNumber:number;
  // evento:Evento[];
  editando:boolean;
  creando:boolean;
  public usuarioAux:UsuarioInterface={
    identificador:0,
    nombreUsuario:"",
    apodo:"",
    correo:"",
    password:"",
    password_confirmation:"",
    esVerificado:0,
    //key$?:string; identificador es la key
    rol:0,
    fechaActualizacion:"",
    fechaEliminacion:"",
    fechaCreacion:"",
    activo:null,
    observaciones:null,
  };

  roles = [
    {value: '1', viewValue: 'Administrador'},
    {value: '2', viewValue: 'Trabajador'},
    {value: '4', viewValue: 'Otros'}
  ];
  selectedValue: string;
  constructor(
              private router:Router,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EditarPerfilDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any
            ) {
              // if(data.usuario!=null){
                this.usuarioAux=data.usuario;
                // this.idNumber=data.identificador;
                // console.log(this.id);
                  this.id= this.usuarioAux.identificador;
                  console.log(this.id);
                // console.log(this.row.identificador);
                 // this.id=this.usuario.identificador;
                 // this.usuario=this.usuario;
                 console.log(this.usuarioAux);
                this.editando=false;
                console.log(this.editando);
                // this._usuariosService.getUsuario(this.id)
                //     .subscribe( usuario => {usuario.data.password="",   this.usuario = usuario.data, console.log(usuario)})
                //     console.log("pone password vacio");


              // }
              // else{
              //   // const dialogRef = this.dialog.open(EditarUsuarioDialog, {
              //   //   height: '800px',
              //   //   width: '450px'
              //   // });
              //   console.log("this.creando",this.creando);
              //   this.creando=false;
              //   // this.evento = [];
              //   // this.usuario= localStorage.identificador;
              //   this.route.params.subscribe(parametros=>{
              //     console.log(parametros);
              //   });
              //
              // }




 }





 // borrarEvento(){
 //   this.editando=true;
 //     this._eventosService.borrarEvento( this.id)
 //         .subscribe(respuesta=>{
 //           if(respuesta){
 //             console.log("caracola");
 //             console.log(respuesta);
 //             console.log( "borraevento y ahora va a pedir todos los eventos de nuevo" );
 //           this._eventosService.getEventos("1");
 //           console.log( "aqui los ha pedido ya todos de nuevo y voy a hacer el router navigate a eventos" );
 //           setTimeout(()=>{    //<<<---    using ()=> syntax
 //
 //             location.reload(true);
 //            },3000);
 //
 //            // this.dialogRef.close();
 //
 //           // this.router.navigate(['eventos']);
 //           // this.refresh();
 //           }else{
 //             //todo bien
 //             // delete this.eventos[id];
 //           //   console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
 //           // this._usuariosService.getUsuarios();
 //           // console.log( "aqui los ha pedido ya todos de nuevo" );
 //           // this.refresh();
 //
 //
 //           }
 //
 //         })
 //
 //   }
   cancelar(){
     this.dialogRef.close();
   }









   editarPerfil(){
     this.dialogRef.updateSize('450px', '200px');
     this.editando=true;
     setTimeout(()=>{

          this.dialogRef.close();
            // this.router.navigate(['/perfil', 2]);
      location.reload(true);
     },2000);



     }//fin de editarEvento

}
