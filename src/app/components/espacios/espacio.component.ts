import { Component, OnInit } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { EspacioInterface } from '../../interfaces/espacio.interface';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-espacio',
  templateUrl: './espacio.component.html',
  // styleUrls: ['./espacio.component.css']
})
export class EspacioComponent implements OnInit {

  espacio:EspacioInterface={
    aforo:0,
    identificador:0,
    nombreEspacio:"",
    sitio:"",
  };

  id:number;

  constructor(  private _ItemService:PeticionesCrudService,
                public  logueadoService:LogueadoService,
                private route:ActivatedRoute,
             )
  {
    this.logueadoService.comprobarLogueado();
    this.route.params.subscribe(parametros=>{
      this.id = parametros['id'];
      this._ItemService.getItem(6,this.id,-1,-1).then(
        res => { this.espacio = res as EspacioInterface });
    })
  }

  ngOnInit() {
  }

  guardar() {
    this._ItemService.actualizarItem(6,this.id,this.espacio,-1)
      .then( res => { alert("Actualizado correctamente.") })
      .catch( (err) => { alert("Error interno, no se pudo actualizar.") })
  }

}
