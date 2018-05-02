import { Component, OnInit, Inject }     from '@angular/core';
import { Observable, BehaviorSubject }              from 'rxjs/Rx';
import { PeticionesCrudService, AuthService }       from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent }                from '../ventana-emergente/ventana-emergente.component'
import { RolesInterface }                           from '../../interfaces/roles.interface';
import { SelectionModel }                           from '@angular/cdk/collections';

@Component({
  selector: 'app-nuevo-rol',
  templateUrl: './nuevo-rol.component.html',
  styleUrls: ['../../app.component.css', './roles.component.css']
})

export class NuevoRolComponent implements OnInit {

  items:RolesInterface;
  itemSinModif:RolesInterface;                        //Copia para restaurar
  titulo:string;                                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;                   //Para saber si mostrar o no el spinner
  editar:boolean = false;                             //Saber si el form es para crear o para editar
  bloqCampos:boolean = true;                          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  camposAnyadidos:boolean;                            //Feedback que devuelve a la ventana anterior cuando esta se cierra
  permiso = new BehaviorSubject<number[]>(undefined); //Lista de permisos que tiene un rol para marcar los checkbox
  aux:number;                                         //Cuenta los roles a anyadir o eliminar
  selection = new SelectionModel<number>(true, []);   //Marcar - desmarcar checkbox

  constructor(  private _itemService: PeticionesCrudService,
                private _authService:AuthService,
                public dialogRef: MatDialogRef<NuevoRolComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data,
             )
  {
    // this._authService.comprobarEstadoLog();
    dialogRef.disableClose = true;

    //Si se pasa un item por parametro se inicializa todo para editar
    if(data.item) {
      this.editar = true;
      this.titulo = "Rol";
      this.items = Object.assign({}, data.item as RolesInterface);
      this.itemSinModif = Object.assign({}, data.item as RolesInterface);
      //CARGAMOS PERMISOS
      this.cargarPermisos();
    }
    //Si no lo hay se prepara todo para crear
    else{
      this.limpiarCampos();
      this.bloqCampos = false;
      this.titulo = "Nuevo rol";
    }

    this.camposAnyadidos=false;

  }

  ngOnInit() {
  }

  //Recupera todos los permisos al abrir la ventana o reiniciar campos
  cargarPermisos(){
    this._itemService.getItem(104,this.items.identificador,-1,-1).then(
      res => {
        if(typeof res != "string"){
          let r = res as any;
          this.permiso.next(
            r.data.map(function(obj){
              var rObj = {};
              rObj = obj.identificador;
              return rObj;
            })
          );
          for(let p of this.permiso.getValue()) this.selection.select(p);
        }
      });
  }

  //BOTON - Crear un nuevo item o lo edita si ya existe
  anyadirItem(){
    this.realizandoAccion = true;
    this.aux=this.selection.selected.length;
    if(!this.editar){
      this._itemService.crearItem(4,this.items)
        .then( res => {
          if(typeof res != "string") {
            let r = res as any;
            this.anyadirNuevosRoles(r.identificador);
          }
          else this.alertaNoOk();
        })
    }
    else{
      this._itemService.actualizarItem(4,this.items.identificador,this.items,-1)
        .then( res => {
          if(typeof res != "string"){
            if(this.permiso && this.permiso.getValue()) this.actualizarRoles();
            else this.anyadirNuevosRoles(+this.items.identificador);
          }
          else this.alertaNoOk();
        })
    }
  }

  //Cuando creamos un rol
  anyadirNuevosRoles(id:number){
    if(this.aux > 0){
      this.aux--;
      this._itemService.actualizarItem(105,id,null, this.selection.selected[this.aux])
        .then(res=>{
          if(typeof res != "string") this.anyadirNuevosRoles(id);
          else{
            this.alertaNoOk();
          }
        })
    }
    else this.alertaOk();
  }

  //Cuando editamos un rol
  actualizarRoles(){
    if(this.aux > 0){
      this.aux--;
      if(this.permiso.getValue().indexOf(this.selection.selected[this.aux]) == -1){
        //Guardamos (Si el permiso no existia, se guarda)
        this._itemService.actualizarItem(105,this.items.identificador,null, this.selection.selected[this.aux])
          .then(res=>{
            if(typeof res != "string") this.actualizarRoles();
            else this.alertaNoOk();
          })
      }
      else{
        //Eliminamos (Si el permiso aux existia, se elimina)
        this._itemService.eliminarItem(105,this.items.identificador,this.selection.selected[this.aux]).then(res=>{
          if(typeof res != "string") this.actualizarRoles();
          else this.alertaNoOk();
        })
      }

    }
    else this.alertaOk();
  }

  //BOTON - Cuando se esta en la opcion de crear vacia los campos del form
  limpiarCampos(){
    this.items={
      identificador:null,
      nombreRol:null,
    }
    this.selection.clear();
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  restaurarValores(){
    this.items={
      identificador:this.itemSinModif.identificador,
      nombreRol:this.itemSinModif.nombreRol,
    }
    this.permiso = new BehaviorSubject<number[]>(undefined);
    this.selection.clear();
    this.cargarPermisos();
  }

  //BOTON - Cerrar ventana emergente volviendo a la anterior
  cerrarDialogo(){
    this.dialogRef.close(this.camposAnyadidos);
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
      this.aux = 0;
      this.realizandoAccion = false;
      this.camposAnyadidos = true;
      if(!this.editar) this.limpiarCampos();
      else {
        this.bloqCampos = true;
        this.restaurarValores();
      }
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
      this.aux = 0;
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
