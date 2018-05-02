import { Component, OnInit, Inject } from '@angular/core';
import { PeticionesCrudService, AuthService } from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent } from '../ventana-emergente/ventana-emergente.component'
import { CarteraInterface } from '../../interfaces/cartera.interface';

@Component({
  selector: 'app-nueva-cartera',
  templateUrl: './nueva-cartera.component.html',
  styleUrls: ['../../app.component.css']
})

export class NuevaCarteraComponent implements OnInit {

  items:CarteraInterface;
  itemSinModif:CarteraInterface;      //Guardar la copia para restaurar
  titulo:string;                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;   //Para saber si mostrar o no el spinner
  // editar:boolean = false;             //Saber si el form es para crear o para editar
  // bloqCampos:boolean = true;          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  camposAnyadidos:boolean;            //Feedback que devuelve a la ventana anterior cuando esta se cierra

  constructor(  private _itemService: PeticionesCrudService,
                private _authService:AuthService,
                public dialogRef: MatDialogRef<NuevaCarteraComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data,
             )
  {
    // this._authService.comprobarEstadoLog();
    dialogRef.disableClose = true;

    //Si se pasa un item por parametro se inicializa todo para editar
    // if(data.item) {
    //   this.editar = true;
    //   this.titulo = "Cartera";
    //   this.items = Object.assign({}, data.item as CarteraInterface);
    //   this.itemSinModif = Object.assign({}, data.item as CarteraInterface);
    // }
    // //Si no lo hay se prepara todo para crear
    // else{
    this.limpiarCampos();
    // this.bloqCampos = false;
    this.titulo = "Nueva cartera";
    // }

    this.camposAnyadidos=false;

  }

  ngOnInit() {
  }

  //BOTON - Crear un nuevo item o lo edita si ya existe
  anyadirItem(){
    this.realizandoAccion = true;

    // if(!this.editar){
      this._itemService.crearItem(8,this.items)
        .then( res => {
          if(typeof res != "string") this.alertaOk();
          else this.alertaNoOk();
        })
    // }
    // else{
    //   this._itemService.actualizarItem(8,this.items.identificador,this.items,-1)
    //     .then( res => {
    //       if(typeof res != "string") this.alertaOk();
    //       else this.alertaNoOk();
    //     })
    // }
  }

  //BOTON - Cuando se esta en la opcion de crear vacia los campos del form
  limpiarCampos(){
    this.items={
      identificador:"",
      nombreCartera:"",
      year:null,
      trimestre:null,
      estado:null,
      fechaCreacion:"",
      fechaActualizacion:"",
      fechaEliminacion:""
    }
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  // restaurarValores(){
  //   this.items={
  //     identificador:this.itemSinModif.identificador,
  //     nombreCartera:this.itemSinModif.nombreCartera,
  //     year:this.itemSinModif.year,
  //     trimestre:this.itemSinModif.trimestre,
  //     estado:this.itemSinModif.estado,
  //     fechaCreacion:this.itemSinModif.fechaCreacion,
  //     fechaActualizacion:this.itemSinModif.fechaActualizacion,
  //     fechaEliminacion:this.itemSinModif.fechaEliminacion,
  //   }
  // }

  //BOTON - Cerrar ventana emergente volviendo a la anterior
  cerrarDialogo(){
    this.dialogRef.close(this.camposAnyadidos);
  }

  //Bloquea y desbloquea los campos del form al pulsar los btn EDITAR o CANCELAR
  // disable_enable_campos(){
  //   if(this.bloqCampos) this.bloqCampos = false;
  //   else {
  //     this.restaurarValores();
  //     this.bloqCampos = true;
  //   }
  // }

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
      // if(!this.editar) this.limpiarCampos();
      // else this.bloqCampos = true;
      this.limpiarCampos();
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
      this.limpiarCampos();
      // if(!this.editar) this.limpiarCampos();
      // else {
      //   this.bloqCampos = true;
        // this.restaurarValores();
      // }
    });
  }
}
