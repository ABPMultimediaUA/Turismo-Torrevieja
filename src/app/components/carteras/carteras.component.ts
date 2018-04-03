import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';

import { Cartera }  from "../../interfaces/cartera.interface";

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
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AlertService, AuthenticationService, CarterasService, LogueadoService } from '../../services/index';

import {EliminarCarteraDialog} from "./eliminar-cartera-dialog.component";
import {EditarCarteraDialog} from "./editar-cartera-dialog.component";

@Component({
  selector: 'app-carteras',
  templateUrl: './carteras.component.html'
})
export class CarterasComponent implements OnInit {
  row:Cartera;
  // carteras:any[] = [];
  loading:boolean = true;
  //pagination
  paginacion:any = [];
  cantidadPagina:any[]=[];
  carterasPorPagina:number=10;
  ItemsPorPagina:string;
  carterasActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;
  // k:number;
  row:Cartera;

  //megacaca
    ELEMENT_DATA: Cartera[];
    carteras:any[] = [];
    displayedColumns = ['select','identificador', 'nombreCartera', 'year', 'trimestre','estado', 'fechaCreacion', 'fechaActualizacion'];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    selection = new SelectionModel<Cartera>(true, []);

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

      ngAfterViewInit() {
          console.log("entra en el sort ese");

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.selection = new SelectionModel<Cartera>(true, []);
        console.log(this.dataSource.sort);
      }
  //finalmegacaca
  constructor(private _carterasService:CarterasService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService,
              public dialog: MatDialog
            ) {
              this.logueadoService.comprobarLogueado();

              console.log("estaLogueado:");
              console.log(this.logueadoService.estaLogueado);
        this._carterasService.getCarteras("1")
          .subscribe( data =>{
            console.log(data);

            this.carteras= data.data;
            console.log("array de carteras:");
            console.log(this.carteras);
            // console.log("carteras[3]:");
            // console.log(this.carteras[3]);



            //megapis
            this.ELEMENT_DATA = this.carteras;
            this.displayedColumns = ['select','identificador', 'nombreCartera', 'year', 'trimestre','estado', 'fechaCreacion', 'fechaActualizacion'];
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.selection = new SelectionModel<Cartera>(true, []);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            //finalmegapis





          })
  }
  ngOnInit() {
  }

  editar(cartera){
    // this.router.navigate(['carteras']);
    this.router.navigate(['/cartera', cartera.identificador]);

     // [routerLink]="['/cartera', cartera.identificador]"
  }
  openDialogEditar(row){

     console.log(row);
     const dialogRef = this.dialog.open(EditarCarteraDialog, {
       height: '400px',
       width: '350px',
       data: { row: row }
     });
  }
  openDialogEliminar(row) {


  console.log(row);

    const dialogRef = this.dialog.open(EliminarCarteraDialog, {
      height: '200px',
      width: '450px',
      data: { row: row }
    });
  }
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
  cambiarNumCarterasPorPagina(){
    this.carterasPorPagina=this.carterasPorPagina;
    console.log("nuevo numero de carteras por pagina: ", this.carterasPorPagina);
    var n = this.carterasPorPagina.toString();
    localStorage.setItem("ItemsPorPagina", n);

     location.reload(true);
  }
  nuevaPagina(pagina:number){
    this.currentPage=pagina;
    console.log("pagina que pido:");
    console.log(pagina);
    let x = this.carterasPorPagina * (pagina-1);
    let y = x + (this.carterasPorPagina-1);
    this.carterasActuales=[];

    if(pagina==this.totalPaginas){
      for(let i=x;i<this.carteras.length;i++)
      {
        this.carterasActuales.push(this.carteras[i]);
      }
    }else{
      for(let i=x;i<=y;i++)
      {
        this.carterasActuales.push(this.carteras[i]);
      }
    }





  }

  borrarCartera(id:string){
      this._carterasService.borrarCartera(id)
          .subscribe(respuesta=>{
            if(respuesta){
              console.log("caracola");
              console.log(respuesta);
              console.log( "borracartera y ahora va a pedir todos los carteras de nuevo" );
            this._carterasService.getCarteras("1");
            console.log( "aqui los ha pedido ya todos de nuevo y voy a hacer el router navigate a carteras" );
            location.reload(true);
            this.router.navigate(['carteras']);
            // this.refresh();
            }else{
              //todo bien
              delete this.carteras[id];
            }
          })
    }
  }
