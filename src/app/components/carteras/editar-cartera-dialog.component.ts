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
import { Cartera }  from "../../interfaces/cartera.interface";
import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, CarterasService, LogueadoService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';
@Component({
  selector: 'editar-cartera-dialog',
  templateUrl: 'editar-cartera-dialog.html'
})
export class EditarCarteraDialog {
  row:Cartera;
  id:string;
  // evento:Evento[];
  editando:boolean;
  creando:boolean;
  public cartera:Cartera={
    identificador:"",
    nombreCartera:"",
    year:2019,
    trimestre:0,
    estado:0,
    fechaCreacion:"",
    fechaActualizacion:"",
    fechaEliminacion:""
  };
  trimestres = [
    {value: '1', viewValue: '1er Trimestre'},
    {value: '2', viewValue: '2do Trimestre'},
    {value: '3', viewValue: '3er Trimestre'},
    {value: '4', viewValue: '4to Trimestre'}
  ];
  selectedValue: string;
  constructor(private _carterasService:CarterasService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EditarCarteraDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any
            ) {
              if(data.row!=null){
                this.row=data.row;

                // console.log(this.row.identificador);
                 this.id=this.row.identificador;
                 this.cartera=this.row;
                 console.log(this.cartera);
                this.editando=false;
                this._carterasService.getCartera(this.id)
                    .subscribe( cartera => {cartera.data.password="",   this.cartera = cartera.data, console.log(cartera)})
                    console.log("pone password vacio");
              }else{

                console.log("this.creando",this.creando);
                this.creando=false;
                // this.evento = [];
                this.logueadoService.comprobarLogueado();
                // this.cartera= localStorage.identificador;
                this.route.params.subscribe(parametros=>{
                  console.log(parametros);
                });

              }




 }




   cancelar(){
     this.dialogRef.close();
   }




   crearCartera(){

     console.log(this.creando);
     this.dialogRef.updateSize('450px', '200px');
     this.creando=true;
     console.log(this.creando);
     setTimeout(()=>{

          this.dialogRef.close();
            // this.router.navigate(['/eventos', 1]);
        location.reload(true);
     },2000);
           console.log(this.cartera);
           console.log("hola");
             this._carterasService.nuevaCartera( this.cartera )
               .subscribe( data=>{
                 //this.router.navigate(['/heroe',data.name])
                 console.log(data);
                 // this.errorEvento = false;
                 // this.rgstrEvento = true;
             //    this.ngForm.reset();



               } ,);

     }


   editarCartera(){
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
             this._carterasService.nuevaCartera( this.cartera )
               .subscribe( data=>{
                 //this.router.navigate(['/heroe',data.name])
                 console.log("HHHHHHHHHHHHHHHHHHHHHHH");
                 console.log(data);
                 // this.errorEvento = false;
                 // this.rgstrEvento = true;
             //    this.ngForm.reset();



               } ,);



         }else{

         //actualizando
         console.log("voy a actualizar cartera");
          console.log("cartera que quiero actualizar:", this.cartera);
          console.log("this.id:", this.id);

          // this.usuario.nombreUsuario=this.row.nombreUsuario;
          // this.usuario.apodo=this.row.apodo;
          // this.usuario.rol=this.row.rol;
         this._carterasService.actualizarCartera(this.cartera, this.id)
             .subscribe(data=>{
               console.log("data que queremos actualizar"+data);
                 this.router.navigate(['carteras']);
             },);

         }

     }//fin de editarEvento

}
