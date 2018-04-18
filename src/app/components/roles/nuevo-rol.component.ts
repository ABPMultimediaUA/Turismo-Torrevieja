import { Component, OnInit, Inject } from '@angular/core';
import { PeticionesCrudService, AuthService } from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent } from '../ventana-emergente/ventana-emergente.component'
import { RolesInterface } from '../../interfaces/roles.interface';
import { PermisosInterface }  from "../../interfaces/permisos.interface";

@Component({
  selector: 'app-nuevo-rol',
  templateUrl: './nuevo-rol.component.html',
  styleUrls: ['../../app.component.css', './roles.component.css']
})

export class NuevoRolComponent implements OnInit {

  items:RolesInterface;
  itemSinModif:RolesInterface;        //Guardar la copia para restaurar
  titulo:string;                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;   //Para saber si mostrar o no el spinner
  editar:boolean = false;             //Saber si el form es para crear o para editar
  bloqCampos:boolean = true;          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  camposAnyadidos:boolean;            //Feedback que devuelve a la ventana anterior cuando esta se cierra
  permisosCambiados:string[]=[];      //Guarda todos los checkbox que van cambiando de estado
  permiso:PermisosInterface[];        //Guarda los permisos
  rolActualizado = false;             //Comprueba si se ha actualizado el rol
  permisosAMarcar:number[]=[];

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
      this._itemService.getItem(104,this.items.identificador,-1,-1).then(
        res => {
          if(typeof res != "string"){
            this.permiso = res as PermisosInterface[];
            // this.marcarPermisos();
            this.permisosAMarcar = res[data].map(function(obj){
              var rObj = {};
              rObj = obj.identificador;
              return rObj;
            });
          }
        });
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

  //BOTON - Crear un nuevo item o lo edita si ya existe
  anyadirItem(){
    this.realizandoAccion = true;

    if(!this.editar){
      this._itemService.crearItem(4,this.items)
        .then( res => {
          if(typeof res != "string"){
            for(var i=0; i<this.permisosCambiados.length; i++){
              this._itemService.actualizarItem(105,this.items.identificador,null, this.permisosCambiados[i])
                .then(res=>{
                  if(typeof res != "string") this.alertaOk();
                  else this.alertaNoOk();
                })
            }
          }
          else this.alertaNoOk();
        })
    }
    else{
      this._itemService.actualizarItem(4,this.items.identificador,this.items,-1)
        .then( res => {
          if(typeof res != "string"){
            for(var i=0; i<this.permisosCambiados.length; i++){
              if(this.existeRol(this.permisosCambiados[i])){
                //Eliminamos (Si el permiso aux existia, se elimina)
                this._itemService.eliminarItem(105,this.items.identificador,this.permisosCambiados[i])
                  .then(data=>{})
                  .catch( error=> {
                    let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
                    // this.errorMensaje.push("Error al eliminar algún permiso.");
                    // this.errorRolActualizar = true;
                  },);
              }
              else{
                //Guardamos (Si el permiso no existia, se guarda)
                this._itemService.actualizarItem(105,this.items.identificador, null,this.permisosCambiados[i])
                  .then(data=>{})
                  .catch( error=> {
                    let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
                    // this.errorMensaje.push("Error al añadir algún permiso.");
                    // this.errorRolActualizar = true;
                  },);
              }
            }
          }
          else this.alertaNoOk();
        })
    }
  }

  //BOTON - Cuando se esta en la opcion de crear vacia los campos del form
  limpiarCampos(){
    this.items={
      identificador:null,
      nombreRol:null,
    }
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  restaurarValores(){
    this.items={
      identificador:this.itemSinModif.identificador,
      nombreRol:this.itemSinModif.nombreRol,
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

  //GUARDAR ID DE TODOS LOS CHECKBOX MODIFICADOS
  checkboxCambiado(id){
    // console.log(document.getElementById('1').getElementsByTagName('input').checked);
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
    for(var i=0; i<this.permisosCambiados.length; i++) console.log("bucle " + this.permisosCambiados[i]);
  }

  //COMPROBAR SI EXISTE UN PERMISO EN EL ARRAY PERMISOS
  existeRol(i:string){
    var r:boolean = false;
    for(var x = 0; x<this.permiso.length; x++){
      if(this.permiso[x].identificador == i){
        r = true;
        x=this.permiso.length;
      }
    }
    return r;
  }

  //MARCA COMO TRUE TODOS LOS CHECKBOX/PERMISOS QUE TENGA EL ROL
  marcarPermisos(){
    for(var i=0; i<this.permiso.length; i++){
        try{
          document.getElementById(this.permiso[i].identificador).setAttribute("checked","checked");
        }catch(error){ console.log("No existe permiso " + error); }
    }
  }

  //
  tienePermisoCB(i:number):boolean{
    if(this.permisosAMarcar)
      if(this.permisosAMarcar.indexOf(i) != -1) return true;
  }
}










































// import { Component, OnInit } from '@angular/core';
// import { NgForm }  from "@angular/forms";
// import { Router, ActivatedRoute } from "@angular/router";
// import { RolesInterface }  from "../../interfaces/roles.interface";
// import { AlertService , PeticionesCrudService } from '../../services/index';
//
// @Component({
//   selector: 'app-rol',
//   templateUrl: './nuevo-rol.component.html'
// })
// export class NuevoRolComponent implements OnInit {
//   errorRol = false;
//   rgstrRol = false;
//   errorRolActualizar = false;
//   permisosCambiados:string[]=[];
//
//   nuevo:boolean = false;
//
//   errorMensaje:string[]=[];
//
//   public rol:RolesInterface={
//     identificador:"",
//     nombreRol:"",
//   };
//
//   constructor(  private _rolesService: PeticionesCrudService,
//                 private router:Router,
//                 private route:ActivatedRoute,//esto es para pasar como parametro
//                 )
//   {
//     this.route.params.subscribe(parametros=>{ });
//   }
//
//   ngOnInit() {
//   }
//
//   guardar()
//   {
//       this._rolesService.crearItem(4,this.rol )
//         .then( res=>{
//           this.rol = res as RolesInterface;
//           this.errorRol = false;
//           this.rgstrRol = true;
//           //CREAMOS PERMISOS
//           for(var i=0; i<this.permisosCambiados.length; i++){
//             this._rolesService.actualizarItem(105,this.rol.identificador,null, this.permisosCambiados[i])
//               .then(data=>{})
//               .catch(error=> {
//                 let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
//                 this.errorMensaje.push("Error al añadir algún permiso.");
//                 this.errorRolActualizar = true;
//               });
//           }
//         })
//         .catch( error => {
//           let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
//           this.errorMensaje=[];
//           if(mensaje.error=="No posee permisos para ejecutar esta acción") {
//             this.errorMensaje.push("No posee permisos para ejecutar esta acción");
//           }
//           if(mensaje.error=="No estás verificado"){
//             this.errorMensaje.push("No estás verificado");
//           }
//           if (typeof(mensaje.error.nombreRol) != "undefined"){
//             for(let i=0;i<mensaje.error.nombreRol.length;i++){
//               this.errorMensaje.push(mensaje.error.nombreRol[i]);
//             }
//           }
//           this.errorRol = true;
//           this.rgstrRol = false;
//         });
//       if(!this.rgstrRol){
//         this.errorMensaje.push("No se ha creado ningún rol antes de añadir los permisos.");
//         this.errorRolActualizar = true;
//       }
//     }
//
//     //GUARDAR ID DE TODOS LOS CHECKBOX MODIFICADOS
//     checkboxCambiado(id){
//       if(this.permisosCambiados.length == 0){ this.permisosCambiados.push(id); }
//       else{
//         var existe:number = -1;
//         for(var i=0; i<this.permisosCambiados.length; i++){
//           if(this.permisosCambiados[i]==id){
//             existe = i;
//             i=this.permisosCambiados.length;
//           }
//         }
//         if(existe == -1) this.permisosCambiados.push(id);
//         else this.permisosCambiados.splice(existe);
//       }
//       //for(var i=0; i<this.permisosCambiados.length; i++) console.log("bucle " + this.permisosCambiados[i]);
//     }
//   }
