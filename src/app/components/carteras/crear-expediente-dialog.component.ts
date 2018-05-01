import { Component, OnInit, Inject }                from '@angular/core';
import { PeticionesCrudService, AuthService }       from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent }                from '../ventana-emergente/ventana-emergente.component'
import { ExpedienteInterface }                      from '../../interfaces/expediente.interface';
import { UsuarioInterface }                         from '../../interfaces/usuario.interface';

@Component({
  selector: 'crear-expediente-dialog',
  templateUrl: 'crear-expediente-dialog.html',
  styleUrls: ['../../app.component.css']
})

export class CrearExpedienteDialog implements OnInit {

  items:ExpedienteInterface;
  // itemSinModif:ExpedienteInterface;   //Guardar la copia para restaurar
  users:UsuarioInterface[]=[]
  titulo:string;                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;   //Para saber si mostrar o no el spinner
  // editar:boolean = false;             //Saber si el form es para crear o para editar
  // bloqCampos:boolean = true;          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  camposAnyadidos:boolean = false;    //Feedback que devuelve a la ventana anterior cuando esta se cierra
  tipoCRUD:number = 0;                //Seleccionar el tipo de url para el crudService

  constructor(  private _itemService: PeticionesCrudService,
                private _authService:AuthService,
                public dialogRef: MatDialogRef<CrearExpedienteDialog>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data,
             )
  {
    dialogRef.disableClose = true;
    this.limpiarCampos();
    this.titulo = "Nuevo evento";

    //COGEMOS LOS USUARIOS
    this._itemService.getItem(5,-1,-1,-1,-1,"","").then(
      res => {
        let r = res as any;
        if(typeof res != "string") this.users = r.data as UsuarioInterface[];
    });

    // if(data.item) this.items.cartera = data.item;
    // else this.dialogRef.close(this.camposAnyadidos);
  }

  ngOnInit() {
  }

  //BOTON - Crear un nuevo item o lo edita si ya existe
  anyadirItem(){
    this.realizandoAccion = true;
    this._itemService.crearItem(this.tipoCRUD,this.items)
      .then( res => {
        if(typeof res != "string") this.alertaOk();
        else this.alertaNoOk();
      })

      // this._itemService.actualizarItem(this.tipoCRUD,this.items.identificador,this.items,-1)
      //   .then( res => {
      //     if(typeof res != "string") this.alertaOk();
      //     else this.alertaNoOk();
      //   })

  }

  //BOTON - Cuando se esta en la opcion de crear vacia los campos del form
  limpiarCampos(){
    this.items={
      identificador:null,
      nombreExpediente:null,
      avance:0,
      cartera:this.data.item,
      coordinador:null,
      detalle:null,
      fechaFin:null,
      fechaInicio:null,
      image:null,
      titulo:null,
    }
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  // restaurarValores(){
  //   this.items={
  //     nombreExpediente:this.itemSinModif.nombreExpediente,
  //     avance:0,
  //     cartera:this.itemSinModif.cartera,
  //     coordinador:this.itemSinModif.coordinador,
  //     detalle:this.itemSinModif.detalle,
  //     fechaFin:this.itemSinModif.fechaFin,
  //     fechaInicio:this.itemSinModif.fechaInicio,
  //     identificador:this.itemSinModif.identificador,
  //     image:this.itemSinModif.image,
  //     titulo:this.itemSinModif.titulo,
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
    });
  }
}
