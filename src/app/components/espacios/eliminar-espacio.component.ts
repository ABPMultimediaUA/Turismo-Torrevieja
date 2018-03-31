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
  eliminandoItem:boolean[]=[];

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
    for(var i = 0; i < this.items.length; i++) this.eliminandoItem.push(true);
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

    for(var i = 0; i < this.items.length; i++){
      this._itemService.eliminarItem(6,this.items[i].identificador,-1)
        .then( res => {
          this.eliminandoItem[i] = false;
          this.comprobarEliminado();
        })
        .catch( (err) => {
          i = this.items.length;
          let sms:string = "Se ha producido un error inesperado.";
          let icono:number = 1;
          const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
            height: '17em',
            width: '32em',
            data: { item: sms, item2: icono }
          });
          dialogRef.afterClosed().subscribe( res => {
            this.cerrarDialogo(true);
          });
        })
    }
  }

  //Comprueba que se hayan eliminado todos los items y de forma correcta
  comprobarEliminado(){
    let res:boolean = false;
    for(var i = 0; i < this.items.length; i++){
      if(this.eliminandoItem[i]) {
        res = true;
        i = this.items.length;
      }
    }
    if(res) {
      let sms:string = "Acción realizada correctamente";
      let icono:number = 0;
      const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
        height: '17em',
        width: '32em',
        data: { item: sms, item2: icono }
      });
      dialogRef.afterClosed().subscribe( res => {
        this.cerrarDialogo(true);
      });
    }
  }

  //Cerrar ventana emergente
  cerrarDialogo(i:boolean){
    this.dialogRef.close(i);
  }

}
