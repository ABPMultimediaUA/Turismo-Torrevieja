import { Component, OnInit, Inject }                from '@angular/core';
import { PeticionesCrudService, AuthService }       from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent }                from '../ventana-emergente/ventana-emergente.component'
import { ProveedorInterface }                       from '../../interfaces/proveedor.interface';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['../../app.component.css', './proveedores.component.css']
})

export class NuevoProveedorComponent implements OnInit {

  items:ProveedorInterface;
  itemSinModif:ProveedorInterface;    //Guardar la copia para restaurar
  titulo:string;                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;   //Para saber si mostrar o no el spinner
  editar:boolean = false;             //Saber si el form es para crear o para editar
  bloqCampos:boolean = true;          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  camposAnyadidos:boolean;            //Feedback que devuelve a la ventana anterior cuando esta se cierra

  constructor(  private _itemService: PeticionesCrudService,
                private _authService:AuthService,
                public dialogRef: MatDialogRef<NuevoProveedorComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data,
             )
  {
    // this._authService.comprobarEstadoLog();
    dialogRef.disableClose = true;

    //Si se pasa un item por parametro se inicializa todo para editar
    if(data.item) {
      this.editar = true;
      this.titulo = "Proveedor";
      this.items = Object.assign({}, data.item as ProveedorInterface);
      this.itemSinModif = Object.assign({}, data.item as ProveedorInterface);
    }
    //Si no lo hay se prepara todo para crear
    else{
      this.limpiarCampos();
      this.bloqCampos = false;
      this.titulo = "Nuevo proveedor";
    }

    this.camposAnyadidos=false;

  }

  ngOnInit() {
  }

  //BOTON - Crear un nuevo item o lo edita si ya existe
  anyadirItem(){
    this.realizandoAccion = true;

    if(!this.editar){
      this._itemService.crearItem(7,this.items)
        .then( res => {
          if(typeof res != "string") this.alertaOk();
          else this.alertaNoOk();
        })
    }
    else{
      this._itemService.actualizarItem(7,this.items.identificador,this.items,-1)
        .then( res => {
          if(typeof res != "string") this.alertaOk();
          else this.alertaNoOk();
        })
    }
  }

  //BOTON - Cuando se esta en la opcion de crear vacia los campos del form
  limpiarCampos(){
    this.items={
      identificador:null,
      nombreProveedor:null,
      codigoPostal:null,
      provincia:null,
      localidad:null,
      direccion:null,      
      cifnif:null,
      clase:null,
      correoUno:null,
      correoDos:null,
      telefonoUno:null,
      telefonoDos:null,
      telefonoTres:null,
      fechaActualizacion:null,
      fechaCreacion:null,
      fechaEliminacion:null,
    }
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  restaurarValores(){
    this.items={
      cifnif:this.itemSinModif.cifnif,
      clase:this.itemSinModif.clase,
      codigoPostal:this.itemSinModif.codigoPostal,
      correoDos:this.itemSinModif.correoDos,
      correoUno:this.itemSinModif.correoUno,
      direccion:this.itemSinModif.direccion,
      fechaActualizacion:this.itemSinModif.fechaActualizacion,
      fechaCreacion:this.itemSinModif.fechaCreacion,
      fechaEliminacion:this.itemSinModif.fechaEliminacion,
      identificador:this.itemSinModif.identificador,
      localidad:this.itemSinModif.localidad,
      nombreProveedor:this.itemSinModif.nombreProveedor,
      provincia:this.itemSinModif.provincia,
      telefonoDos:this.itemSinModif.telefonoDos,
      telefonoTres:this.itemSinModif.telefonoTres,
      telefonoUno:this.itemSinModif.telefonoUno,
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
