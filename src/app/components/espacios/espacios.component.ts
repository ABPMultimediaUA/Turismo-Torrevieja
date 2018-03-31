import { Component, OnInit, ViewChild } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { EspacioInterface } from '../../interfaces/espacio.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { EliminarEspacioComponent } from './eliminar-espacio.component';
import { NuevoEspacioComponent } from './nuevo-espacio.component';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['../../app.component.css','./espacios.component.css']
})

export class EspaciosComponent implements OnInit {

  items:EspacioInterface[]=[];
  row:EspacioInterface;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource(this.items);
  selection = new SelectionModel<EspacioInterface>(true, []);

  constructor(  private _itemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                public dialog: MatDialog
             )
  {
    this.logueadoService.comprobarLogueado();
    this.cargarItems(6);
  }

  ngOnInit() {
  }

  //Cargar items
  cargarItems(i:number){
    this.logueadoService.comprobarLogueado();

    this._itemService.getItem(i,-1,-1,-1).then(
      res => {
        this.items = res as EspacioInterface[]
        this.ngAfterViewInit()
      }
    );
  }

  //Cargar tabla
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.items);
    this.selection = new SelectionModel<EspacioInterface>(true, []);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
    this.cargarItems(303);
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
          this.cargarItems(6);
        }
      });
    }
  }

  //Funcion abrir formulario nuevo item
  botonAnyadirItem(){
    const dialogRef = this.dialog.open(NuevoEspacioComponent,{
      height: '90%',
      width: '90%',
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        var b1 = <HTMLInputElement> document.getElementById("btnEliminarItems");
        b1.disabled = true;
        this.cargarItems(6);
      }
    });
  }

}
