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
import { Usuario }  from "../../interfaces/usuario.interface";
import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, UsuariosService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';
@Component({
  selector: 'editar-usuario-dialog',
  templateUrl: 'editar-usuario-dialog.html'
})
export class EditarUsuarioDialog {
  row:Usuario;
  id:string;
  // evento:Evento[];
  editando:boolean;
  creando:boolean;
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
  selectedValue: string;
  constructor(private _usuariosService:UsuariosService,
              private router:Router,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EditarUsuarioDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any
            ) {
              if(data.row!=null){
                this.row=data.row;

                // console.log(this.row.identificador);
                 this.id=this.row.identificador;
                 this.usuario=this.row;
                 console.log(this.usuario);
                this.editando=false;
                this._usuariosService.getUsuario(this.id)
                    .subscribe( usuario => {usuario.data.password="",   this.usuario = usuario.data, console.log(usuario)})
                    console.log("pone password vacio");
              }else{
                // const dialogRef = this.dialog.open(EditarUsuarioDialog, {
                //   height: '800px',
                //   width: '450px'
                // });
                console.log("this.creando",this.creando);
                this.creando=false;
                // this.evento = [];
                // this.usuario= localStorage.identificador;
                this.route.params.subscribe(parametros=>{
                  console.log(parametros);
                });

              }




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




   crearUsuario(){

     console.log(this.creando);
     this.dialogRef.updateSize('450px', '200px');
     this.creando=true;
     console.log(this.creando);
     setTimeout(()=>{

          this.dialogRef.close();
            // this.router.navigate(['/eventos', 1]);
       location.reload(true);
     },2000);
           console.log(this.usuario);
           console.log("hola");
             this._usuariosService.nuevoUsuario( this.usuario )
               .subscribe( data=>{
                 //this.router.navigate(['/heroe',data.name])
                 console.log(data);
                 // this.errorEvento = false;
                 // this.rgstrEvento = true;
             //    this.ngForm.reset();



               }
               // ,
               // error=> {
               //   //this.router.navigate(['/heroe',data.name])
               //   //console.log(error);
               //   let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
               //   console.log(mensaje.error);
               //
               //   this.errorMensaje=[];
               //
               //               if(mensaje.error=="No posee permisos para ejecutar esta acción")
               //               {
               //                 this.errorMensaje.push("No posee permisos para ejecutar esta acción");
               //               }
               //
               //               if(mensaje.error=="No estás verificado")
               //               {
               //                 this.errorMensaje.push("No estás verificado");
               //               }
               //
               //
               //
               //
               //
               //   if (typeof(mensaje.error.nombreEvento) != "undefined")
               //   {
               //     for(let i=0;i<mensaje.error.nombreEvento.length;i++)
               //     {
               //       this.errorMensaje.push(mensaje.error.nombreEvento[i]);
               //     }
               //   }
               //    if (typeof(mensaje.error.correo) != "undefined")
               //    {
               //      for(let i=0;i<mensaje.error.correo.length;i++)
               //      {
               //        this.errorMensaje.push(mensaje.error.correo[i]);
               //      }
               //    }
               //    if (typeof(mensaje.error.apodo) != "undefined")
               //    {
               //      for(let i=0;i<mensaje.error.apodo.length;i++)
               //      {
               //        this.errorMensaje.push(mensaje.error.apodo[i]);
               //      }
               //    }
               //    if (typeof(mensaje.error.password) != "undefined")
               //    {
               //      for(let i=0;i<mensaje.error.password.length;i++)
               //      {
               //        this.errorMensaje.push(mensaje.error.password[i]);
               //      }
               //    }
               //
               //   console.log(this.errorMensaje);
               //
               //
               //
               //   /*
               //   for(let i=0; i<mensaje.error.length;i++)
               //   {
               //     console.log("Entrar2");
               //     console.log(mensaje.error[i]);
               //   }
               //   */
               //
               //   this.errorEvento = true;
               //   this.rgstrEvento = false;
               // }
               ,);

     }






   editarUsuario(){
     this.dialogRef.updateSize('450px', '200px');
     this.editando=true;
     setTimeout(()=>{

          this.dialogRef.close();
           // this.router.navigate(['/eventos', 2]);
       // location.reload(true);
     },2000);
     // this.dialogRef.close();
         console.log("ewfefe"+this.id);
         if(this.id == "nuevo"){
           console.log("voy a guardar nuevo usuario(abajo):");
             console.log(this.row);
             this._usuariosService.nuevoUsuario( this.usuario )
               .subscribe( data=>{
                 //this.router.navigate(['/heroe',data.name])
                 console.log(data);
                 // this.errorEvento = false;
                 // this.rgstrEvento = true;
             //    this.ngForm.reset();



               }
               // error=> {
               //   //this.router.navigate(['/heroe',data.name])
               //   //console.log(error);
               //   let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
               //   console.log(mensaje.error);
               //
               //   this.errorMensaje=[];
               //
               //               if(mensaje.error=="No posee permisos para ejecutar esta acción")
               //               {
               //                 this.errorMensaje.push("No posee permisos para ejecutar esta acción");
               //               }
               //
               //               if(mensaje.error=="No estás verificado")
               //               {
               //                 this.errorMensaje.push("No estás verificado");
               //               }
               //
               //
               //
               //
               //
               //   if (typeof(mensaje.error.nombreEvento) != "undefined")
               //   {
               //     for(let i=0;i<mensaje.error.nombreEvento.length;i++)
               //     {
               //       this.errorMensaje.push(mensaje.error.nombreEvento[i]);
               //     }
               //   }
               //    if (typeof(mensaje.error.correo) != "undefined")
               //    {
               //      for(let i=0;i<mensaje.error.correo.length;i++)
               //      {
               //        this.errorMensaje.push(mensaje.error.correo[i]);
               //      }
               //    }
               //    if (typeof(mensaje.error.apodo) != "undefined")
               //    {
               //      for(let i=0;i<mensaje.error.apodo.length;i++)
               //      {
               //        this.errorMensaje.push(mensaje.error.apodo[i]);
               //      }
               //    }
               //    if (typeof(mensaje.error.password) != "undefined")
               //    {
               //      for(let i=0;i<mensaje.error.password.length;i++)
               //      {
               //        this.errorMensaje.push(mensaje.error.password[i]);
               //      }
               //    }
               //
               //   console.log(this.errorMensaje);
               //
               //
               //
               //   /*
               //   for(let i=0; i<mensaje.error.length;i++)
               //   {
               //     console.log("Entrar2");
               //     console.log(mensaje.error[i]);
               //   }
               //   */
               //
               //   this.errorEvento = true;
               //   this.rgstrEvento = false;
               // }


               ,);



           //insertando
           // this._usuariosService.nuevoUsuario(this.usuario)
           //     .subscribe(data=>{
           //         this.router.navigate(['/usuario',data.name])
           //     },
           //     error=>console.error(error));
         }else{

         //actualizando
         console.log("voy a actualizar usuario");
          console.log("usuario que quiero actualizar:", this.usuario);
          console.log("this.id:", this.id);

          this.usuario.nombreUsuario=this.row.nombreUsuario;
          this.usuario.apodo=this.row.apodo;
          this.usuario.rol=this.row.rol;
         this._usuariosService.actualizarUsuario(this.usuario, this.id)
             .subscribe(data=>{
               console.log("data que queremos actualizar"+data);
               // this.errorUsuarioActualizar = false;
                 this.router.navigate(['usuarios']);
             } ,
             // error=> {
             //   //this.router.navigate(['/heroe',data.name])
             //   //console.log(error);
             //   let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
             //   console.log(mensaje.error);
             //
             //   this.errorMensaje=[];
             //
             //               if(mensaje.error=="No posee permisos para ejecutar esta acción")
             //               {
             //                 this.errorMensaje.push("No posee permisos para ejecutar esta acción");
             //               }
             //
             //               if(mensaje.error=="No estás verificado")
             //               {
             //                 this.errorMensaje.push("No estás verificado");
             //               }
             //
             //
             //
             //
             //
             //   if (typeof(mensaje.error.nombreEvento) != "undefined")
             //   {
             //     for(let i=0;i<mensaje.error.nombreEvento.length;i++)
             //     {
             //       this.errorMensaje.push(mensaje.error.nombreEventoa[i]);
             //     }
             //   }
             //    if (typeof(mensaje.error.correo) != "undefined")
             //    {
             //      for(let i=0;i<mensaje.error.correo.length;i++)
             //      {
             //        if(mensaje.error.correo[i]=="The correo must be a valid correo address.")//este ya esta traducido
             //        {
             //          this.errorMensaje.push("El correo debe ser un correo válido");
             //        }
             //        else{
             //          this.errorMensaje.push(mensaje.error.correo[i]);//aqui guarda todos los errores de correo y los muestra
             //        }
             //
             //      }
             //    }
             //    if (typeof(mensaje.error.apodo) != "undefined")
             //    {
             //      for(let i=0;i<mensaje.error.apodo.length;i++)
             //      {
             //        this.errorMensaje.push(mensaje.error.apodo[i]);
             //      }
             //    }
             //    if (typeof(mensaje.error.password) != "undefined")
             //    {
             //      for(let i=0;i<mensaje.error.password.length;i++)
             //      {
             //        this.errorMensaje.push(mensaje.error.password[i]);
             //      }
             //    }
             //
             //   console.log(this.errorMensaje);
             //
             //   this.errorEventoActualizar =true;
             // }
             );

         // setTimeout(()=>{
         //
         //      this.dialogRef.close();
         //       this.router.navigate(['/eventos', 2]);
         //   // location.reload(true);
         //  },3000);
         }

     }//fin de editarEvento

}
