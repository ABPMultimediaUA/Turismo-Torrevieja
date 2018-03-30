import { Component, OnInit, ViewChild } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { EspacioInterface } from '../../interfaces/espacio.interface';
import { Router } from '@angular/router'; //TODO eliminar
import { EliminarEspacioComponent } from "./eliminar-espacio.component";
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {MatDialogModule} from '@angular/material/dialog';

// import { MatFormFieldModule } from '@angular/material';
// import {MatInputModule} from '@angular/material';
// import { MatPaginatorModule } from '@angular/material';
// import { MatIcon} from '@angular/material';
// import {MatCheckboxModule} from '@angular/material/checkbox';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatIconRegistry, MatIconModule, MatButtonModule } from '@angular/material';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {MatDialogModule} from '@angular/material/dialog';
// import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import {EliminarUsuarioDialog} from "../usuarios/eliminar-usuario-dialog.component";
// import {EditarUsuarioDialog} from "../usuarios/editar-usuario-dialog.component";


@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['../../app.component.css','./espacios.component.css']
})

export class EspaciosComponent implements OnInit {

  items:EspacioInterface[]=[];
  row:EspacioInterface;
  displayedColumns = ['select', 'identificador', 'nombreEspacio', 'sitio', 'aforo', 'eliminar'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource(this.items);
  selection = new SelectionModel<EspacioInterface>(true, []);

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.items);
    this.selection = new SelectionModel<EspacioInterface>(true, []);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }


  constructor(  private _itemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                private router:Router,
                public dialog: MatDialog
             )
  {
    this.logueadoService.comprobarLogueado();

    this._itemService.getItem(6,-1,-1,-1).then(
      res => {
        this.items = res as EspacioInterface[]
        this.ngAfterViewInit()
      }
    );
  }

  ngOnInit() {
  }

  realizarBusqueda(b){ //TODO por hacer
    console.log("busqueda");
    console.log(b);
    this._itemService.getItem(303,b,-1,-1).then(
      res => {
        console.log(res)
      }
    );
  }

  activarEliminarMultiplesItems(i){
    var b1 = <HTMLInputElement> document.getElementById("btnEliminarItems");
    if(i.length>0) b1.disabled = false;
    else b1.disabled = true;
  }

  botonEliminarItem(i){
    const dialogRef = this.dialog.open(EliminarEspacioComponent,{
      height: '90%',
      width: '90%',
      data: { item: i }
    });
    // console.log(i);
    // if(i){
    //   if(i.lenght){
    //
    //   }
    // }
  }


}
