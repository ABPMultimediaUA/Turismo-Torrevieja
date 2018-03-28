import { Component, OnInit } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { EspacioInterface } from '../../interfaces/espacio.interface';
import { Router } from '@angular/router';

import { MatTableDataSource, MatSort } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginatorModule, MatPaginator } from '@angular/material';
import { MatIcon } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule, MatButtonModule } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.css']
})

export class EspaciosComponent implements OnInit {

  espacio:EspacioInterface[]=[];
  espaciosActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;
  loading:boolean = true;
  cantidadPagina:any[]=[];

  row:EspacioInterface;
  displayedColumns = ['identificador', 'select'];

  constructor(  private _espacioService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                private router:Router
             )
  {
    this.logueadoService.comprobarLogueado();

    this._espacioService.getItem(6,-1,-1,-1).then(
      res => {
        this.espacio = res as EspacioInterface[];

        this.totalPaginas = Math.ceil(this.espacio.length/10);
        this.loading=false;

        for(let i=0;i<this.totalPaginas;i++){ this.cantidadPagina.push(i); }

        if(this.espacio.length>9){
          for(let i=0;i<=9;i++){ this.espaciosActuales.push(this.espacio[i]); }
        }
        else{
          for(let i=0;i<this.espacio.length;i++){ this.espaciosActuales.push(this.espacio[i]); }
        }
      }
    );

  }

  ngOnInit() {
  }

  nuevaPagina(pagina:number){
    this.currentPage=pagina;
    let x = 10 * (pagina-1);
    let y = x + 9;
    this.espaciosActuales=[];

    if(pagina==this.totalPaginas){
      for(let i=x;i<this.espacio.length;i++){
        this.espaciosActuales.push(this.espacio[i]);
      }
    }else{
      for(let i=x;i<=y;i++){
        this.espaciosActuales.push(this.espacio[i]);
      }
    }
  }

  borrarItem(id:number){
    this._espacioService.eliminarItem(6,id,-1)
    .then( res =>{
      if(res){
        this._espacioService.getItem(6,1,-1,-1);
        location.reload(true);
        this.router.navigate(['espacios']);
      }
    })
  }

}
