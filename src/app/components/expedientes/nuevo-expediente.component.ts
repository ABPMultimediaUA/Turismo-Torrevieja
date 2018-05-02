import { Component, OnInit }                from '@angular/core';
import { PeticionesCrudService, AuthService }       from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent }                from '../ventana-emergente/ventana-emergente.component'
import { ExpedienteInterface }                      from '../../interfaces/expediente.interface';
import { UsuarioInterface }                         from '../../interfaces/usuario.interface';
import { CarteraInterface }                         from '../../interfaces/cartera.interface';

@Component({
  selector: 'nuevo-expediente',
  templateUrl: 'nuevo-expediente.component.html',
  styleUrls: ['../../app.component.css']
})

export class NuevoExpedienteComponent implements OnInit {

  items:ExpedienteInterface;
  users:UsuarioInterface[]=[];
  carteras:CarteraInterface[]=[];
  titulo:string;                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;   //Para saber si mostrar o no el spinner
  camposAnyadidos:boolean = false;    //Feedback que devuelve a la ventana anterior cuando esta se cierra
  tipoCRUD:number = 0;                //Seleccionar el tipo de url para el crudService

  constructor(  private _itemService: PeticionesCrudService,
                private _authService:AuthService,
                public dialogRef: MatDialogRef<NuevoExpedienteComponent>,
                public dialog: MatDialog
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

    //COGEMOS LAS CARTERAS
    this._itemService.getItem(301,-1,-1,-1,-1,"","").then(
      res => {
        let r = res as any;
        if(typeof res != "string") this.carteras = r.data as CarteraInterface[];
    });

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
  }

  //BOTON - Cuando se esta en la opcion de crear vacia los campos del form
  limpiarCampos(){
    this.items={
      identificador:null,
      nombreExpediente:null,
      avance:0,
      cartera:null,
      coordinador:null,
      detalle:null,
      fechaFin:null,
      fechaInicio:null,
      image:null,
      titulo:null,
    }
  }


  //BOTON - Cerrar ventana emergente volviendo a la anterior
  cerrarDialogo(){
    this.dialogRef.close(this.camposAnyadidos);
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
