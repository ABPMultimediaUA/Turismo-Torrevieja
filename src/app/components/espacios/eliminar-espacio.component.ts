import { Component, OnInit } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';

import { EspacioInterface } from '../../interfaces/espacio.interface';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';

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
  selector: 'app-eliminar-espacio',
  templateUrl: './eliminar-espacio.component.html',
  styleUrls: ['../../app.component.css', './espacios.component.css']
})

export class EliminarEspacioComponent implements OnInit {

  constructor(  private _itemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                private router:Router
             )
  {
    this.logueadoService.comprobarLogueado();

  }

  ngOnInit() {
  }

}
