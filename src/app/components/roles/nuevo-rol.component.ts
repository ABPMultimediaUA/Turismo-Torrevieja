import { Component, OnInit, Inject, ViewChild }     from '@angular/core';
import { Observable, BehaviorSubject }              from 'rxjs/Rx';
import { PeticionesCrudService, AuthService }       from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent }                from '../ventana-emergente/ventana-emergente.component'
import { VentanaEmergentePreguntaComponent }        from '../ventana-emergente/ventana-emergente-pregunta.component';
import { RolesInterface }                           from '../../interfaces/roles.interface';
import { SelectionModel }                           from '@angular/cdk/collections';

@Component({
  selector: 'app-nuevo-rol',
  templateUrl: './nuevo-rol.component.html',
  styleUrls: ['../../app.component.css', './roles.component.css']
})

export class NuevoRolComponent implements OnInit {

  items:RolesInterface={
    identificador:null,
    nombreRol:null,
    activo:"1",
  };
  itemSinModif:RolesInterface;                        //Copia para restaurar
  titulo:string;                                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;                   //Para saber si mostrar o no el spinner
  editar:boolean = false;                             //Saber si el form es para crear o para editar
  bloqCampos:boolean = true;                          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  camposAnyadidos:boolean;                            //Feedback que devuelve a la ventana anterior cuando esta se cierra
  permiso = new BehaviorSubject<number[]>(undefined); //Lista de permisos que tiene un rol para marcar los checkbox
  aux:number;                                         //Cuenta los roles a anyadir o eliminar
  aux2:number;
  selection = new SelectionModel<number>(true, []);   //Marcar - desmarcar checkbox
  permisosCambiados:number[]=[];
  selectionAct = new SelectionModel<number>(true, []);   //Marcar - desmarcar checkbox
  activoChange:boolean = false;
  permisoChange:boolean = false;

  @ViewChild("formulario") formulario;

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
      if(this.items.activo == "1") this.selectionAct.select(0);
      //CARGAMOS PERMISOS
      this.cargarPermisos();
    }
    //Si no lo hay se prepara todo para crear
    else{
      this.bloqCampos = false;
      this.titulo = "Nuevo rol";
    }

    this.camposAnyadidos=false;

  }

  ngOnInit() {
  }

  //Recupera todos los permisos al abrir la ventana o reiniciar campos
  cargarPermisos(){
    this._itemService.getItem(104,+this.items.identificador,-1,-1,-1,"","").then(
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
      if(this.selectionAct.selected.length > 0 && this.selectionAct.selected[0]==0) this.items.activo = "1";
      else this.items.activo = "0";
      this._itemService.actualizarItem(4,this.items.identificador,this.items,-1)
        .then( res => {
          if(typeof res != "string"){
            this.itemSinModif = Object.assign({}, this.items as RolesInterface);
            if(this.permiso && this.permiso.getValue()) {
              this.aux2 = this.permisosCambiados.length;
              this.actualizarRoles();
            }
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

    if(this.aux2 > 0 ){
      this.aux2--;
      if(this.permiso.getValue().indexOf(this.permisosCambiados[this.aux2]) != -1){
        //Eliminamos (Si el permiso guardado en el aux existia, se elimina)
        this._itemService.eliminarItem(105,this.items.identificador,this.permisosCambiados[this.aux2]).then(res=>{
          if(typeof res == "string") this.alertaNoOk();
          else this.actualizarRoles();
        })
      }
      else{
        //Guardamos (Si el permiso que se ha cambiado no existia en el aux, se guarda)
        this._itemService.actualizarItem(105,this.items.identificador,null, this.permisosCambiados[this.aux2])
          .then(res=>{
            if(typeof res == "string") this.alertaNoOk();
            else this.actualizarRoles();
          })
      }
    }
    else this.alertaOk();
  }

  comprobarEstadoActualizarPerm(p){
    let a:boolean = true;
    for(var x = 0; x<p.length; x++){
      if(p[x] == false) {
        a = false;
        x = p.length;
      }
    }
    if(a) {
      this.alertaOk();
      this.realizandoAccion = false;
    }
  }

  //BOTON - Cuando se esta en la opcion de crear vacia los campos del form
  limpiarCampos(){
    this.items={
      identificador:null,
      nombreRol:null,
      activo:"1",
    }
    this.formulario.reset(this.items, false);
    this.selection.clear();
    this.permisoChange = false;
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  restaurarValores(){
    this.formulario.reset(this.itemSinModif, false);
    this.selectionAct.clear();
    if(this.items.activo == "1") this.selectionAct.select(0);
    this.activoChange = false;
    this.permisoChange = false;
    this.bloqCampos = true;
    this.permisosCambiados = [];

    this.permiso = new BehaviorSubject<number[]>(undefined);
    this.selection.clear();
    this.cargarPermisos();
  }

  //BOTON - Cerrar ventana emergente volviendo a la anterior
  cerrarDialogo(){
    if(this.formulario.form.dirty || this.activoChange || this.permisoChange){
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
      this.aux = 0;
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
      this.aux = 0;
      this.realizandoAccion = false;
      this.camposAnyadidos = true;
      if(!this.editar) this.limpiarCampos();
      else this.restaurarValores();
    });
  }

  checkboxCambiado(id){
   if(this.permisosCambiados.length == 0){ this.permisosCambiados.push(id); }
   else{
     var existe:number = -1;
     for(var i=0; i<this.permisosCambiados.length; i++){
       if(this.permisosCambiados[i]==id){
          existe = i;
          i=this.permisosCambiados.length;
        }
      }
      if(existe == -1) this.permisosCambiados.push(id);
      else this.permisosCambiados.splice(existe);
    }
    // for(var i=0; i<this.permisosCambiados.length; i++) console.log("bucle " + this.permisosCambiados[i]);
  }

}
