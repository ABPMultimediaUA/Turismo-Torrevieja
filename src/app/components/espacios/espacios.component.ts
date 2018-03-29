import { Component, OnInit, ViewChild } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { EspacioInterface } from '../../interfaces/espacio.interface';
import { Router } from '@angular/router';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
// import { MatFormFieldModule } from '@angular/material';
// import {MatInputModule} from '@angular/material';
// import {SelectionModel} from '@angular/cdk/collections';
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
  // styleUrls: ['./espacios.component.css'],
  styleUrls: ['../../app.component.css']
})

export class EspaciosComponent implements OnInit {

  items:EspacioInterface[]=[];

  row:EspacioInterface;
  displayedColumns = ['identificador', 'nombreEspacio', 'sitio', 'aforo', 'eliminar'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource = new MatTableDataSource(this.items);
    // selection = new SelectionModel<EspacioInterface>(true, []);
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.items);
    // this.selection = new SelectionModel<EspacioInterface>(true, []);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(  private _itemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                private router:Router
             )
  {
    this.logueadoService.comprobarLogueado();

    this._itemService.getItem(6,-1,-1,-1).then(
      res => {
        this.items = res as EspacioInterface[];
        this.ngAfterViewInit();
      }
    );
  }

  ngOnInit() {
  }

}
