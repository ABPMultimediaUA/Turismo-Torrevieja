import { Component, OnInit, Inject } from '@angular/core';
import { PeticionesCrudService, AuthService } from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent } from '../ventana-emergente/ventana-emergente.component'
import { CarteraInterface } from '../../interfaces/cartera.interface';

@Component({
  selector: 'eliminar-cartera-dialog',
  templateUrl: 'eliminar-cartera-dialog.html',
  styleUrls: ['../../app.component.css']
})

export class EliminarCarteraDialog implements OnInit {

  items:CarteraInterface[]=[];
  eliminando:boolean;
  aux:number; //Items a eliminar, recursividad

  dataSource = new MatTableDataSource(this.items);

  constructor(  private _itemService: PeticionesCrudService,
                private _authService:AuthService,
                public dialogRef: MatDialogRef<EliminarCarteraDialog>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data
             )
  {
    // this._authService.comprobarEstadoLog();
    dialogRef.disableClose = true;

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
      this._itemService.eliminarItem(8,this.items[this.aux].identificador,-1)
          .then( res => {
            if(typeof res != "string") this.eliminarItem();
            else this.alertaNoOk();
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
