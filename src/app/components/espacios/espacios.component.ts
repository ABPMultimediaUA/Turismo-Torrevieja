import { Component, OnInit, ViewChild } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { EliminarEspacioComponent } from './eliminar-espacio.component';
import { PaginacionInterface } from '../../interfaces/paginacion.interface';
import { EspacioInterface } from '../../interfaces/espacio.interface';
import { NuevoEspacioComponent } from './nuevo-espacio.component';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['../../app.component.css','./espacios.component.css']
})

export class EspaciosComponent implements OnInit {

  items:EspacioInterface[]=[];
  option_Items_Pgn='10';
  paginacion:PaginacionInterface={
    count:null,
    current_page:1,
    links:{
      previous:null,
      next:null,
    },
    per_page:null,
    total:null,
    total_pages:1
  };
  row:EspacioInterface;
  @ViewChild(MatSort) sort: MatSort;

  dataSource = new MatTableDataSource(this.items);
  selection = new SelectionModel<EspacioInterface>(true, []);

  constructor(  private _itemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                public dialog: MatDialog
             )
  {
    this.logueadoService.comprobarLogueado();
    this.cargarItems(6,+this.option_Items_Pgn,1);
  }

  ngOnInit() {
  }

  //Cargar items
  cargarItems(peticion:number, per_pgn:number, pgn:number){
    this.logueadoService.comprobarLogueado();

    this._itemService.getItem(peticion,-1,per_pgn,pgn).then(
      res => {
        console.log(res);
        this.items = res["data"] as EspacioInterface[]
        this.paginacion = res["meta"].pagination as PaginacionInterface
        this.ngAfterViewInit()
      },
    );
  }

  //Cargar tabla
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.items);
    this.selection = new SelectionModel<EspacioInterface>(true, []);
    this.dataSource.sort = this.sort;
  }

  //Marcar checkbox
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  //Marcar checkbox
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  //Buscador
  //TODO por hacer, da error
  realizarBusqueda(b){
    console.log("busqueda");
    console.log(b);
    // this.cargarItems(303,1);
  }

  //Habilita o deshabilita el boton eliminar lista de items
  activarEliminarMultiplesItems(i){
    var b1 = <HTMLInputElement> document.getElementById("btnEliminarItems");
    if(i.length>0) b1.disabled = false;
    else b1.disabled = true;
  }

  //Funcion eliminar item o items
  botonEliminarItem(i){
    if(i){
      const dialogRef = this.dialog.open(EliminarEspacioComponent,{
        height: '90%',
        width: '90%',
        data: { item: i }
      });
      dialogRef.afterClosed().subscribe( res => {
        if(res){
          var b1 = <HTMLInputElement> document.getElementById("btnEliminarItems");
          b1.disabled = true;
          // this.cargarItems(6,1);
        }
      });
    }
  }

  //Funcion abrir formulario crear / editar item
  editarAnyadirItem(row){
    const dialogRef = this.dialog.open(NuevoEspacioComponent,{
      height: '90%',
      width: '90%',
      data: { item: row }
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        var b1 = <HTMLInputElement> document.getElementById("btnEliminarItems");
        b1.disabled = true;
        // this.cargarItems(6,1);
      }
    });
  }

  actualizarPaginacion(){
    this.paginacion.per_page = +this.option_Items_Pgn;
    this.cargarItems(6,+this.option_Items_Pgn,1);
  }

}
