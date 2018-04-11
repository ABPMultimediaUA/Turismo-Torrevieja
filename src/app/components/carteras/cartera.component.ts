import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Cartera }  from "../../interfaces/cartera.interface";
import { Usuario }  from "../../interfaces/usuario.interface";
import { ExpedienteInterfaz }  from "../../interfaces/expediente.interface";
import { AlertService, PeticionesCrudService } from '../../services/index';

import {MatTooltipModule} from '@angular/material/tooltip';
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
import {HomeComponent} from "../home/home.component";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon
import {CrearExpedienteDialog} from "./crear-expediente-dialog.component";
import {EliminarExpedienteDialog} from "./eliminar-expediente-dialog.component";
@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html'
})

export class CarteraComponent implements OnInit {
  formExVisible = false;
  errorCartera = false;
  rgstrCartera = false;
  permisoEditar = false;
  errorCarteraActualizar = false;


  //TituloNuevo = "";
  errorMensaje:string[]=[];

  public cartera:Cartera={
    identificador:"",
    nombreCartera:"string",
    year:0,
    trimestre:0,
    estado:0,
    fechaCreacion:"",
    fechaActualizacion:"",
    fechaEliminacion:""
  };

  // public expediente:ExpedienteInterfaz[];
  public users:Usuario[];
  public expN:ExpedienteInterfaz={
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

  estados:string[]=["Nueva","En planificación", "En trámite", "Aprobada", "Gestión","Cerrada"];

  nuevo:boolean = false;
  id:string;


  //megasalchicha
    public expedientes:ExpedienteInterfaz[];
    ELEMENT_DATA: ExpedienteInterfaz[];
    displayedColumns = ['select','identificador', 'nombreExpediente', 'titulo', 'coordinador','fechaInicio', 'fechaFin'];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    selection = new SelectionModel<ExpedienteInterfaz>(true, []);

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

      ngAfterViewInit() {
          console.log("entra en el sort ese");

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.selection = new SelectionModel<ExpedienteInterfaz>(true, []);
        console.log(this.dataSource.sort);
      }
  //finalmegasalchicha


  constructor( private _carterasService: PeticionesCrudService,
                  private router:Router,
                  private route:ActivatedRoute,//esto es para pasar como parametro
                  public dialog: MatDialog
                )
  {

    this.route.params.subscribe(parametros=>{
      this.id = parametros['id'];

      //COGEMOS LA CARTERA
      this._carterasService.getItem(8,this.id,-1,-1).then(
        res => {
          this.cartera = res as Cartera;
      });

      //COGEMOS SU EXPEDIENTES
      this._carterasService.getItem(106,this.id,-1,-1).then(
        res => {
          this.expedientes = res as ExpedienteInterfaz[];
          //queso

          this.ELEMENT_DATA = this.expedientes;
          this.displayedColumns = ['select','identificador', 'nombreExpediente', 'titulo', 'coordinador','fechaInicio', 'fechaFin'];
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.selection = new SelectionModel<ExpedienteInterfaz>(true, []);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          //finalqueso


          console.log(res);
      });


      //COGEMOS LOS USUARIOS
      this._carterasService.getItem(5,-1,-1,-1).then(
        res => {
          this.users = res as Usuario[];
      });
    });
  }

  ngOnInit() {
  }



  guardar(){
    this._carterasService.actualizarItem(8,this.id,this.cartera,-1)
      .then( res=> { alert("Actualizado correctamente."); })
      .catch( (err) => { alert("Se ha producido un error inesperado.\nNo se ha podido actualizar la cartera.");
                         console.log( err.toString()) })
  }
  openDialogCrear(){

     const dialogRef = this.dialog.open(CrearExpedienteDialog, {
       height: '600px',
       width: '500px',
       data: { carteraId: this.id  }
     });
  }
  openDialogEliminar(row) {


  console.log(row);

    const dialogRef = this.dialog.open(EliminarExpedienteDialog, {
      height: '200px',
      width: '450px',
      data: { row: row }
    });
  }
  selectRow(row) {
   console.log(row);
   this.router.navigate(['/evento', row.identificador]);
  }
  puedeEditar(){
    console.log("1.puedeEditar? =",this.permisoEditar);

      this.permisoEditar = true;


    console.log("2.puedeEditar? =",this.permisoEditar);
    return this.permisoEditar;
  }

  mostrarFormExp(i){
      this.formExVisible = i;
      this.borrarFormExp();
  }

  crearNuevoExp(){
    this._carterasService.crearItem(0,this.expN)
      .then( res=> {
        alert("Expediente creado correctamente.");
        this.expedientes.push(res as ExpedienteInterfaz);
        this.borrarFormExp();
        this.formExVisible = false;
        location.reload(true);
      })
      .catch( (err) => { alert("Se ha producido un error inesperado.\nNo se ha podido crear el expediente.");
                         console.log( err.toString()) })
  }
  editar(expediente){

    this.router.navigate(['/expediente', expediente.identificador]);
// [routerLink]="['/expediente', e.identificador]"

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  borrarFormExp(){
    this.expN={
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
    }
  }

}
