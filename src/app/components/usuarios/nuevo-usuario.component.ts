import { Component, OnInit, Inject, ViewChild }     from '@angular/core';
import { PeticionesCrudService, AuthService }       from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent }                from '../ventana-emergente/ventana-emergente.component'
import { VentanaEmergentePreguntaComponent }        from '../ventana-emergente/ventana-emergente-pregunta.component';
import { UsuarioInterface }                         from '../../interfaces/usuario.interface';
import { RolesInterface }                           from '../../interfaces/roles.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['../../app.component.css', './usuarios.component.css']
})

export class NuevoUsuarioComponent implements OnInit {

  items:UsuarioInterface={
    identificador:null,
    nombreUsuario:null,
    rol:null,
    esVerificado:null,
    apodo:null,
    correo:null,
    password:null,
    password_confirmation:null,
    fechaActualizacion:null,
    fechaCreacion:null,
    fechaEliminacion:null,
  };
  itemSinModif:UsuarioInterface;      //Guardar la copia para restaurar
  titulo:string;                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;   //Para saber si mostrar o no el spinner
  editar:boolean = false;             //Saber si el form es para crear o para editar
  bloqCampos:boolean = true;          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  camposAnyadidos:boolean;            //Feedback que devuelve a la ventana anterior cuando esta se cierra
  roles:RolesInterface[]=[];

  @ViewChild("formulario") formulario;

  constructor(  private _itemService: PeticionesCrudService,
                private _authService:AuthService,
                public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data,
             )
  {
    dialogRef.disableClose = true;

    //Si se pasa un item por parametro se inicializa todo para editar
    if(data.item) {
      this.editar = true;
      this.titulo = "Usuario";
      this.items = Object.assign({}, data.item as UsuarioInterface);
      this.itemSinModif = Object.assign({}, data.item as UsuarioInterface);
    }
    //Si no lo hay se prepara todo para crear
    else{
      this.bloqCampos = false;
      this.titulo = "Nuevo usuario";
    }

    //Obtenemos los roles
    this._itemService.getItem(4,-1,-1,-1,-1,"","").then(
      res => {
        if(typeof res != "string"){
          if(res && res["data"] && res["meta"]){
            this.roles = res["data"] as RolesInterface[];
          }
        }
      }
    );

    this.camposAnyadidos=false;

  }

  ngOnInit() {
  }

  //BOTON - Crear un nuevo item o lo edita si ya existe
  anyadirItem(){
    this.realizandoAccion = true;

    if(!this.editar){
      this._itemService.crearItem(5,this.items)
        .then( res => {
          if(typeof res != "string") this.alertaOk();
          else this.alertaNoOk();
        })
    }
    else{
      delete this.items.password;
      delete this.items.password_confirmation;
      this._itemService.actualizarItem(5,this.items.identificador,this.items,-1)
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
      nombreUsuario:null,
      rol:null,
      esVerificado:null,
      apodo:null,
      correo:null,
      password:null,
      password_confirmation:null,
      fechaActualizacion:null,
      fechaCreacion:null,
      fechaEliminacion:null,
    }
    this.formulario.reset(this.items, false);
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  restaurarValores(){
    this.formulario.reset(this.itemSinModif, false);
  }

  //BOTON - Cerrar ventana emergente volviendo a la anterior
  cerrarDialogo(){
    if(this.formulario.form.dirty){
      const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
        height: '17em',
        width: '32em',
        data: { item: "Si cierras se perderán los cambios realizados.\n¿Continuar?" }
      });
      dialogRef.afterClosed().subscribe( res => {
        if(res) this.dialogRef.close(this.camposAnyadidos);
      });
    }
    else this.dialogRef.close(this.camposAnyadidos);
  }

  //Bloquea y desbloquea los campos del form al pulsar los btn EDITAR o CANCELAR
  disable_enable_campos(){
    if(this.bloqCampos) this.bloqCampos = false;
    else {
      this.restaurarValores();
      this.bloqCampos = true;
    }
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
