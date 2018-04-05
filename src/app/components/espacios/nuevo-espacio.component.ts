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
  itemSinModif:EspacioInterface; //Guardar la copia para restaurar
  realizandoAccion:boolean = false; //Para saber si mostrar o no el spinner
  camposAnyadidos:boolean; //Feedback que devuelve a la ventana anterior cuando esta se cierra
  editar:boolean = false;  //Saber si el form es para crear o para editar
  editarInit:boolean = false; //Activar o desactivar el modo edicion

  constructor(  private _itemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                public dialogRef: MatDialogRef<NuevoEspacioComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data,
             )
  {
    this.logueadoService.comprobarLogueado();
    dialogRef.disableClose = true;
    if(data.item) {
      this.editar = true;
      this.items = data.item as EspacioInterface;
      this.itemSinModif = data.item as EspacioInterface;
    }
    else{
      this.limpiarCampos();
      this.habilitarCamposForm();
    }
    this.camposAnyadidos=false;

  }

  ngOnInit() {
  }

  //Crear un nuevo item
  anyadirItem(){
  this.realizandoAccion = true;
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
      this._itemService.actualizarItem(6,this.items.identificador,this.items,-1)
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

  restaurarValores(e){

    this.items={
         identificador:this.itemSinModif.identificador,
         sitio:this.itemSinModif.sitio,
         nombreEspacio:this.itemSinModif.nombreEspacio,
         aforo:this.itemSinModif.aforo,
         fechaCreacion:this.itemSinModif.fechaCreacion,
         fechaActualizacion:this.itemSinModif.fechaActualizacion,
         fechaEliminacion:this.itemSinModif.fechaEliminacion
       }
  }

  //Cerrar ventana emergente
  cerrarDialogo(){
    this.dialogRef.close(this.camposAnyadidos);
  }

  //Cambiar estado editarInit
  estadoEditarInit(){
    if(!this.editarInit) this.editarInit = true;
    else {
      this.editarInit = false;
    }
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
      this.realizandoAccion = false;
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
      this.realizandoAccion = false;
      this.camposAnyadidos = true;
      this.limpiarCampos();
    });
  }

  habilitarCamposForm(){
    var input1 = <HTMLInputElement> document.getElementById("input1");
    var input2 = <HTMLInputElement> document.getElementById("input2");
    var input3 = <HTMLInputElement> document.getElementById("input3");
    console.log(input1)
    // input1.disabled = false;
    // input2.disabled = false;
    // input3.disabled = false;
  }

}
