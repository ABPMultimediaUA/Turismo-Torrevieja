import { Component, OnInit, Inject } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { MatDialogRef, MatDialog } from '@angular/material';
import { VentanaEmergenteComponent } from '../ventana-emergente/ventana-emergente.component'
import { EspacioInterface } from '../../interfaces/espacio.interface';

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  styleUrls: ['../../app.component.css', './espacios.component.css']
})

export class NuevoEspacioComponent implements OnInit {

  items:EspacioInterface;
  camposAnyadidos:boolean;

  constructor(  private _itemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                public dialogRef: MatDialogRef<NuevoEspacioComponent>,
                public dialog: MatDialog,
             )
  {
    this.logueadoService.comprobarLogueado();
    this.limpiarCampos();
    this.camposAnyadidos=false;
  }

  ngOnInit() {
  }

  //Crear un nuevo item
  anyadirItem(){
    let sms:string = "Acción realizada correctamente";
    let icono:number = 0;
    const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
      height: '17em',
      width: '32em',
      data: { item: sms, item2: icono }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.camposAnyadidos = true;
      this.limpiarCampos();
    });
    // this._itemService.crearItem(6,this.items)
    //   .then( res => {
    //     // alert("Creado correctamente.");
    //     // this.borrarForm();
    //   })
    //   .catch( (err) => {
    //     // alert("Error interno, no se pudo crear.")
    //   })
  }

  limpiarCampos(){
    this.items={
      identificador:0,
      sitio:"",
      nombreEspacio:"",
      aforo:0,
      fechaCreacion:"",
      fechaActualizacion:"",
      fechaEliminacion:""
    }
  }

  //Cerrar ventana emergente
  cerrarDialogo(){
    this.dialogRef.close(this.camposAnyadidos);
  }

}





// import { Component, OnInit } from '@angular/core';
// import { PeticionesCrudService, LogueadoService } from '../../services/index';
// import { EspacioInterface } from '../../interfaces/espacio.interface';
// import { Router } from '@angular/router';
//
//
// export class NuevoEspacioComponent implements OnInit {
//
//   constructor(  private _ItemService:PeticionesCrudService,
//                 public  logueadoService:LogueadoService,
//                 private router:Router,
//              )
//
// }
