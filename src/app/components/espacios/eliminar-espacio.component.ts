import { Component, OnInit, Inject } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent } from '../ventana-emergente/ventana-emergente.component'
import { EspacioInterface } from '../../interfaces/espacio.interface';

@Component({
  selector: 'app-eliminar-espacio',
  templateUrl: './eliminar-espacio.component.html',
  styleUrls: ['../../app.component.css', './espacios.component.css']
})

export class EliminarEspacioComponent implements OnInit {

  items:EspacioInterface[]=[];
  eliminando:boolean;
  aux:number; //Items a eliminar, recursividad

  dataSource = new MatTableDataSource(this.items);

  constructor(  private _itemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                public dialogRef: MatDialogRef<EliminarEspacioComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data
             )
  {
    this.logueadoService.comprobarLogueado();

    if(data.item){
      if(data.item.length) this.items=data.item;
      else this.items.push(data.item);
    }

    this.eliminando=false;
    this.aux = this.items.length;
  }

  //Cargar tabla
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.items);
  }

  ngOnInit() {
  }

  //Elimina array items
  eliminarItem(){
    this.eliminando=true;
    if(this.aux>0){
      this.aux=this.aux-1;
      this._itemService.eliminarItem(6,this.items[this.aux].identificador,-1)
          .then( res => {
            this.eliminarItem();
          })
          .catch( (err) => {
            this.alertaNoOk();
          })
    }
    else{
      this.alertaOk();
    }
  }

  //Cerrar ventana emergente
  cerrarDialogo(){
    this.dialogRef.close(false);
  }

  //Ventana emergente si todo ha ido bien
  alertaOk(){
    let sms:string = "Acción realizada correctamente.";
    let icono:number = 0;
    const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
      height: '17em',
      width: '32em',
      data: { item: sms, item2: icono }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.dialogRef.close(true);
    });
  }

  //Ventana emergente si ha habido error
  alertaNoOk(){
    let sms:string = "Se ha producido un error inesperado.";
    let icono:number = 1;
    const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
      height: '17em',
      width: '32em',
      data: { item: sms, item2: icono }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.dialogRef.close(true);
    });
  }

}
