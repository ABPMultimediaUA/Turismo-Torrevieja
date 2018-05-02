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
import {MatDatepickerModule} from '@angular/material/datepicker';

import { Element }  from "../../interfaces/element.interface";
import { CarteraInterface }  from "../../interfaces/cartera.interface";
import { UsuarioInterface }  from "../../interfaces/usuario.interface";


import { ExpedienteInterface }  from "../../interfaces/expediente.interface";

import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import {AlertService } from '../../services/alert.service';
import { AlertService, PeticionesCrudService,ExpedientesService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';
@Component({
  selector: 'crear-expediente-dialog',
  templateUrl: 'crear-expediente-dialog.html'
})
export class CrearExpedienteDialog {
  row:CarteraInterface;
  id:number;
  // evento:Evento[];
  editando:boolean;
  creando:boolean;
  public cartera:CarteraInterface={
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
  public users:UsuarioInterface[];

  public expediente:ExpedienteInterface={
    identificador:null,
    avance:0,
    cartera:0,
    coordinador:0,
    detalle:"",
    fechaFin:null,
    fechaInicio:null,
    image:"",
    nombreExpediente:"",
    titulo:"",
  };
  selectedValue: string;
  constructor(private _expedientesservice:ExpedientesService,
              private _carterasService: PeticionesCrudService,
              private router:Router,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<CrearExpedienteDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any
            ) {
              // if(data.row!=null){
              //   this.row=data.row;
              //
              //   // console.log(this.row.identificador);
              //    this.id=this.row.identificador;
              //    this.cartera=this.row;
              //    console.log(this.cartera);
              //   this.editando=false;
              //   this._carterasService.getCartera(this.id)
              //       .subscribe( cartera => {cartera.data.password="",   this.cartera = cartera.data, console.log(cartera)})
              //       console.log("pone password vacio");
              // }else{
                this.id = data.carteraId;
                console.log("this.creando",this.creando);
                this.creando=false;
                // this.evento = [];
                // this.cartera= localStorage.identificador;
                this.route.params.subscribe(parametros=>{
                  console.log(parametros);
                });
                //COGEMOS LOS USUARIOS
                this._carterasService.getItem(5,-1,-1,-1).then(
                  res => {
                    this.users = res as UsuarioInterface[];
                });

  }









   cancelar(){
     this.dialogRef.close();
   }


   crearExpediente(identificador){
     var id:string=identificador;
     console.log(id);
     console.log("voy a crear nuevo expediente",this.expediente);
     this.expediente.cartera = +this.id;
     this.expediente.coordinador = +id;

     console.log("expediente premandar",this.expediente);
     this._carterasService.crearItem(0,this.expediente)
       .then( res=> {
         alert("Expediente creado correctamente.");
         // this.expediente.push(res as ExpedienteInterface);
         // this.borrarFormExp();
         // this.formExVisible = false;
         location.reload(true);
       })
       .catch( (err) => { alert("Se ha producido un error inesperado.\nNo se ha podido crear el expediente.");
                          console.log( err.toString()) })
   }

   // crearExpediente(){
   //
   //   console.log(this.creando);
   //   this.dialogRef.updateSize('450px', '200px');
   //   this.creando=true;
   //   console.log(this.creando);
   //   setTimeout(()=>{
   //
   //        this.dialogRef.close();
   //          // this.router.navigate(['/eventos', 1]);
   //     // location.reload(true);
   //   },2000);
   //         console.log(this.expediente);
   //         console.log("hola");
   //           this._expedientesservice.nuevoExpediente( this.expediente )
   //             .subscribe( data=>{
   //               //this.router.navigate(['/heroe',data.name])
   //               console.log(data);
   //               // this.errorEvento = false;
   //               // this.rgstrEvento = true;
   //           //    this.ngForm.reset();
   //
   //
   //
   //             } ,);
   //
   //   }



}
