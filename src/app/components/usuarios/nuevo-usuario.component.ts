import { Component, OnInit, Inject }                from '@angular/core';
import { PeticionesCrudService, AuthService }       from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent }                from '../ventana-emergente/ventana-emergente.component'
import { UsuarioInterface }                         from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['../../app.component.css', './usuarios.component.css']
})

export class NuevoUsuarioComponent implements OnInit {

  items:UsuarioInterface;
  itemSinModif:UsuarioInterface;      //Guardar la copia para restaurar
  titulo:string;                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;   //Para saber si mostrar o no el spinner
  editar:boolean = false;             //Saber si el form es para crear o para editar
  bloqCampos:boolean = true;          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  camposAnyadidos:boolean;            //Feedback que devuelve a la ventana anterior cuando esta se cierra

  constructor(  private _itemService: PeticionesCrudService,
                private _authService:AuthService,
                public dialogRef: MatDialogRef<NuevoUsuarioComponent>,
                public dialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data,
             )
  {
    // this._authService.comprobarEstadoLog();
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
      this.limpiarCampos();
      this.bloqCampos = false;
      this.titulo = "Nuevo usuario";
    }

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
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  restaurarValores(){
    this.items={
      identificador:this.itemSinModif.identificador,
      nombreUsuario:this.itemSinModif.nombreUsuario,
      rol:this.itemSinModif.rol,
      esVerificado:this.itemSinModif.esVerificado,
      apodo:this.itemSinModif.apodo,
      correo:this.itemSinModif.correo,
      password:this.itemSinModif.password,
      password_confirmation:this.itemSinModif.password_confirmation,
      fechaActualizacion:this.itemSinModif.fechaActualizacion,
      fechaCreacion:this.itemSinModif.fechaCreacion,
      fechaEliminacion:this.itemSinModif.fechaEliminacion,
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






























// import { Component, OnInit } from '@angular/core';
// import { NgForm }  from "@angular/forms";
// import { Router, ActivatedRoute } from "@angular/router";
// import { UsuarioInterface }  from "../../interfaces/usuario.interface";
// import { AlertService } from '../../services/index';
//
// @Component({
//   selector: 'app-usuario',
//   templateUrl: './nuevo-usuario.component.html',
// })
// export class NuevoUsuarioComponent implements OnInit {
// errorUsuario = false;
// rgstrUsuario = false;
// errorUsuarioActualizar = false;
// errorMensaje:string[]=[];
// public usuario:UsuarioInterface={
//   identificador:-1,
//   nombreUsuario:"",
//   apodo:"",
//   correo:"",
//   password:"",
//   password_confirmation:"",
//   esVerificado:0,
//   //key$?:string; identificador es la key
//   rol:0
// };
//
// nuevo:boolean = false;
// //id:string;
//
// //
//
//
// constructor(
//                 private router:Router,
//                 private route:ActivatedRoute,//esto es para pasar como parametro
//               ) {
//
//           this.route.params.subscribe(parametros=>{
//                 console.log(parametros);
//                 //this.id = parametros['id']
//                 // if(this.id !== "nuevo"){
//
//                   // this._usuariosService.getUsuario(this.id)
//                   //     .subscribe( usuario => { this.usuario = usuario.data, console.log(usuario)})
//                 // }
//
//                 // if(this.id == "nuevo"){
//                 //   //insertando
//                 // }else{
//                 // //actualizando
//                 // }
//           });
//   }
//
//   ngOnInit() {
//   }
//
//
//
//   guardar()
//
//   {
//         //console.log("ewfefe"+this.id);
//         //if(this.id == "nuevo"){
//           console.log(this.usuario);
//           console.log("hola");
//             // this._usuariosService.nuevoUsuario( this.usuario )
//             //   .subscribe( data=>{
//             //     //this.router.navigate(['/heroe',data.name])
//             //     console.log(data);
//             //     this.errorUsuario = false;
//             //     this.rgstrUsuario = true;
//             // //    this.ngForm.reset();
//             //
//             //
//             //
//             //   },
//             //   error=> {
//             //   },);
//
//
//     }
//
// }
