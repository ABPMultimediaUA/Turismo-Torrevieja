import { Component, OnInit, Inject }                from '@angular/core';
import { PeticionesCrudService, AuthService }       from '../../services/index';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent }                from '../ventana-emergente/ventana-emergente.component'
import { CarteraInterface }                         from '../../interfaces/cartera.interface';

@Component({
  selector: 'app-nueva-cartera',
  templateUrl: './nueva-cartera.component.html',
  styleUrls: ['../../app.component.css']
})

export class NuevaCarteraComponent implements OnInit {

  items:CarteraInterface;
  itemSinModif:CarteraInterface;      //Guardar la copia para restaurar
  titulo:string;                      //El titulo de la ventana emergente
  realizandoAccion:boolean = false;   //Para saber si mostrar o no el spinner y bloquear botones
  camposAnyadidos:boolean;            //Feedback que devuelve a la ventana anterior cuando esta se cierra

  constructor(
    private _itemService: PeticionesCrudService,
    private _authService:AuthService,
    public dialogRef: MatDialogRef<NuevaCarteraComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
  ){
    dialogRef.disableClose = true;
    this.limpiarCampos();
    this.titulo = "Nueva cartera";
    this.camposAnyadidos=false;
  }

  ngOnInit() {
  }

  //BOTON - Crear un nuevo item o lo edita si ya existe
  anyadirItem(){
    this.realizandoAccion = true;

    this._itemService.crearItem(8,this.items)
      .then( res => {
        if(typeof res != "string") this.alertaOk();
        else this.alertaNoOk();
      })
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
