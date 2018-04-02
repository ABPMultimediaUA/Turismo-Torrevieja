import { Component, OnInit, Inject } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent } from '../ventana-emergente/ventana-emergente.component'
import { EspacioInterface } from '../../interfaces/espacio.interface';

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  styleUrls: ['../../app.component.css', './espacios.component.css']
})

export class NuevoEspacioComponent implements OnInit {

  items:EspacioInterface;
  camposAnyadidos:boolean;
  editar:boolean = false;
  editarInit:boolean = false;

  constructor(  private _itemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                public dialogRef: MatDialogRef<NuevoEspacioComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data
             )
  {
    this.logueadoService.comprobarLogueado();
    if(data.item) {
      this.editar = true;
      this.items = data.item as EspacioInterface;
    }
    else{
      this.limpiarCampos();
    }
    this.camposAnyadidos=false;
  }

  ngOnInit() {
  }

  //Crear un nuevo item
  anyadirItem(){
    if(!this.editar){
      this._itemService.crearItem(6,this.items)
        .then( res => {
          this.alertaOk();
        })
        .catch( (err) => {
          this.alertaNoOk();
        })
    }
    else{
      this._itemService.actualizarItem(6,this.items,-1,-1)
        .then( res => {
          this.alertaOk();
        })
        .catch( (err) => {
          this.alertaNoOk();
        })
    }
  }

  limpiarCampos(){
    this.items={
      identificador:null,
      sitio:"",
      nombreEspacio:"",
      aforo:null,
      fechaCreacion:"",
      fechaActualizacion:"",
      fechaEliminacion:""
    }
  }

  //Cerrar ventana emergente
  cerrarDialogo(){
    this.dialogRef.close(this.camposAnyadidos);
  }

  //Cambiar estado editarInit
  estadoEditarInit(){
    if(!this.editarInit) this.editarInit = true;
    else this.editarInit = false;
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
      this.camposAnyadidos = true;
      this.limpiarCampos();
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
      this.camposAnyadidos = true;
      this.limpiarCampos();
    });
  }

}





// import { Component, OnInit } from '@angular/core';
// import { PeticionesCrudService, LogueadoService } from '../../services/index';
// import { EspacioInterface } from '../../interfaces/espacio.interface';
// import { Router } from '@angular/router';
//
//
// export class NuevoEspacioComponent implements OnInit {
//
//   constructor(  private _ItemService:PeticionesCrudService,
//                 public  logueadoService:LogueadoService,
//                 private router:Router,
//              )
//
// }
