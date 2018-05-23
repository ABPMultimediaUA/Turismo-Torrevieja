import { Component, OnInit, Inject, ViewChild }     from '@angular/core';
import { PeticionesCrudService, AuthService }       from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent }                from '../ventana-emergente/ventana-emergente.component'
import { VentanaEmergentePreguntaComponent }        from '../ventana-emergente/ventana-emergente-pregunta.component';
import { EspacioInterface }                         from '../../interfaces/espacio.interface';
import { Observable, BehaviorSubject }              from 'rxjs/Rx';
import { }                                          from '@types/googlemaps';
import { SelectionModel }                           from '@angular/cdk/collections';

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  styleUrls: ['../../app.component.css', './espacios.component.css']
})

export class NuevoEspacioComponent implements OnInit {

  items:EspacioInterface={
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
    activo:"1"
  };
  itemSinModif:EspacioInterface;      //Guardar la copia para restaurar
  titulo:string;                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;   //Para saber si mostrar o no el spinner
  editar:boolean = false;             //Saber si el form es para crear o para editar
  bloqCampos:boolean = true;          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  camposAnyadidos:boolean;            //Feedback que devuelve a la ventana anterior cuando esta se cierra
  selection = new SelectionModel<number>(true, []);   //Marcar - desmarcar checkbox
  activoChange:boolean = false;

  @ViewChild("formulario") formulario;

  latitude = 38.3453359;
  longitude = -0.5042837;
  m_latitude:number;
  m_longitude:number;

  coordenadasNuevas:boolean = false;


  constructor(  private _itemService: PeticionesCrudService,
                private _authService:AuthService,
                public dialogRef: MatDialogRef<NuevoEspacioComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data,
             )
  {
    // this._authService.comprobarEstadoLog();
    dialogRef.disableClose = true;

    //Si se pasa un item por parametro se inicializa todo para editar
    if(data.item) {
      this.editar = true;
      this.titulo = "Espacio";
      this.items = Object.assign({}, data.item as EspacioInterface);
      this.itemSinModif = Object.assign({}, data.item as EspacioInterface);
      if(this.items.activo == "1") this.selection.select(0);
      if(this.items.latitudX && this.items.latitudX != "") {
        this.latitude = (+this.items.latitudX);
        this.m_latitude = (+this.items.latitudX);
        if(this.items.latitudY && this.items.latitudY != ""){
          this.longitude = (+this.items.latitudY);
          this.m_longitude = (+this.items.latitudY);
          console.log(this.m_longitude);
        }
      }
    }
    //Si no lo hay se prepara todo para crear
    else{
      this.bloqCampos = false;
      this.titulo = "Nuevo espacio";
    }

    this.camposAnyadidos=false;


  }

  ngOnInit() {
  }

  ponerMarca(e){
    if(!this.editar || !this.bloqCampos){
      this.items.latitudX = (e.coords.lat).toString();
      this.items.latitudY = (e.coords.lng).toString();
      this.m_latitude = e.coords.lat;
      this.m_longitude = e.coords.lng;
      this.coordenadasNuevas = true;
    }
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
      if(this.selection.selected.length > 0 && this.selection.selected[0]==0) this.items.activo = "1";
      else this.items.activo = "0";
      this._itemService.actualizarItem(6,this.items.identificador,this.items,-1)
        .then( res => {
          if(typeof res != "string") {
            this.itemSinModif = Object.assign({}, this.items as EspacioInterface);
            this.alertaOk();
          }
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
      activo:"1"
    }
    this.formulario.reset(this.items, false);
    this.coordenadasNuevas = false;
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  restaurarValores(){
    this.formulario.reset(this.itemSinModif, false);
    this.selection.clear();
    if(this.items.activo == "1") this.selection.select(0);
    this.activoChange = false;
    this.bloqCampos = true;
    this.coordenadasNuevas = false;
  }

  //BOTON - Cerrar ventana emergente volviendo a la anterior
  cerrarDialogo(){
    if(this.formulario.form.dirty || this.activoChange || this.coordenadasNuevas){
      const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
        height: '17em',
        width: '32em',
        data: { item: "Si cierras se perderán los cambios realizados.\n¿Continuar?" }
      });
      dialogRef.afterClosed().subscribe( res => {
        if(res){
          if(this.editar) this.restaurarValores();
          this.dialogRef.close(this.camposAnyadidos);
        }
      });
    }
    else {
      if(this.editar) this.restaurarValores();
      this.dialogRef.close(this.camposAnyadidos);
    }
  }

  //Bloquea y desbloquea los campos del form al pulsar los btn EDITAR o CANCELAR
  disable_enable_campos(){
    if(this.bloqCampos) this.bloqCampos = false;
    else this.restaurarValores();
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
      else this.restaurarValores();
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
      else this.restaurarValores();
    });
  }
}
