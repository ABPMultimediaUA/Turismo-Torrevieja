import { Component, OnInit } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { EspacioInterface } from '../../interfaces/espacio.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  // styleUrls: ['./nuevo-espacio.component.css']
})
export class NuevoEspacioComponent implements OnInit {

  espacio:EspacioInterface={
    identificador:0,
    sitio:"",
    nombreEspacio:"",
    aforo:0,
    fechaCreacion:"",
    fechaActualizacion:"",
    fechaEliminacion:""
  };

  constructor(  private _ItemService:PeticionesCrudService,
                public  logueadoService:LogueadoService,
                private router:Router,
             )
  {
      this.logueadoService.comprobarLogueado();
  }

  ngOnInit() {
  }

  guardar(){
    this._ItemService.crearItem(6,this.espacio)
      .then( res => {
        alert("Creado correctamente.");
        this.borrarForm();
      })
      .catch( (err) => { alert("Error interno, no se pudo crear.") })
  }

  borrarForm(){
    this.espacio={
      identificador:0,
      sitio:"",
      nombreEspacio:"",
      aforo:0,
      fechaCreacion:"",
      fechaActualizacion:"",
      fechaEliminacion:""
    }
  }
}
