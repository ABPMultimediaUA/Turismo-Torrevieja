import { Component, OnInit, Inject } from '@angular/core';
import { PeticionesCrudService, LoginService } from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent } from '../ventana-emergente/ventana-emergente.component'
import { EspacioInterface } from '../../interfaces/espacio.interface';


// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  styleUrls: ['../../app.component.css', './espacios.component.css']
})

export class NuevoEspacioComponent implements OnInit {

  items:EspacioInterface;
  itemSinModif:EspacioInterface;      //Guardar la copia para restaurar
  titulo:string;                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;   //Para saber si mostrar o no el spinner
  editar:boolean = false;             //Saber si el form es para crear o para editar
  bloqCampos:boolean = true;          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  camposAnyadidos:boolean;            //Feedback que devuelve a la ventana anterior cuando esta se cierra

  constructor(  private _itemService: PeticionesCrudService,
                private _loginService:LoginService,
                public dialogRef: MatDialogRef<NuevoEspacioComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data,
             )
  {
    this._loginService.comprobarEstadoLog();
    dialogRef.disableClose = true;

    //Si se pasa un item por parametro se inicializa todo para editar
    if(data.item) {
      this.editar = true;
      this.titulo = "Espacio";
      this.items = Object.assign({}, data.item as EspacioInterface);
      this.itemSinModif = Object.assign({}, data.item as EspacioInterface);
    }
    //Si no lo hay se prepara todo para crear
    else{
      this.limpiarCampos();
      this.bloqCampos = false;
      this.titulo = "Nuevo espacio";
    }

    this.camposAnyadidos=false;

  }

  ngOnInit() {
  }

  //BOTON - Crear un nuevo item o lo edita si ya existe
  anyadirItem(){
    this.realizandoAccion = true;

    if(!this.editar){
      this._itemService.crearItem(6,this.items)
        .then( res => {
          if(typeof res != "string") this.alertaOk();
          else this.alertaNoOk();
        })
    }
    else{
      this._itemService.actualizarItem(6,this.items.identificador,this.items,-1)
        .then( res => {
          if(typeof res != "string") this.alertaOk();
          else this.alertaNoOk();
        })
    }
  }

  //BOTON - Cuando se esta en la opcion de crear vacia los campos del form
  limpiarCampos(){
    this.items={
      CP:null,
      aforo:null,
      calle:null,
      descripcion:null,
      fechaActualizacion:null,
      fechaCreacion:null,
      fechaEliminacion:null,
      identificador:null,
      latitudX:null,
      latitudY:null,
      localidad:null,
      nombreEspacio:null,
      numero:null,
      planta:null,
      provincia:null,
      puerta:null,
      telefono1:null,
      telefono2:null,
    }
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  restaurarValores(){
    this.items={
      CP:this.itemSinModif.CP,
      aforo:this.itemSinModif.aforo,
      calle:this.itemSinModif.calle,
      descripcion:this.itemSinModif.descripcion,
      fechaActualizacion:this.itemSinModif.fechaActualizacion,
      fechaCreacion:this.itemSinModif.fechaCreacion,
      fechaEliminacion:this.itemSinModif.fechaEliminacion,
      identificador:this.itemSinModif.identificador,
      latitudX:this.itemSinModif.latitudX,
      latitudY:this.itemSinModif.latitudY,
      localidad:this.itemSinModif.localidad,
      nombreEspacio:this.itemSinModif.nombreEspacio,
      numero:this.itemSinModif.numero,
      planta:this.itemSinModif.planta,
      provincia:this.itemSinModif.provincia,
      puerta:this.itemSinModif.puerta,
      telefono1:this.itemSinModif.telefono1,
      telefono2:this.itemSinModif.telefono2,
    }
  }

  //BOTON - Cerrar ventana emergente volviendo a la anterior
  cerrarDialogo(){
    this.dialogRef.close(this.camposAnyadidos);
  }

  //Bloquea y desbloquea los campos del form al pulsar los btn EDITAR o CANCELAR
  disable_enable_campos(){
    if(this.bloqCampos) this.bloqCampos = false;
    else this.bloqCampos = true;
  }

  //Ventana emergente si se ha realizado una peticion y todo ha ido bien
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
      if(!this.editar) this.limpiarCampos();
      else this.bloqCampos = true;
    });
  }

  //Ventana emergente si se ha realizado una peticion y ha habido algun error
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
      if(!this.editar) this.limpiarCampos();
      else {
        this.bloqCampos = true;
        this.restaurarValores();
      }
    });
  }
}
