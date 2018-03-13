import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Proveedor }  from "../../interfaces/proveedor.interface";
import { TareasService } from '../../services/tareas.service';
import { AlertService, AuthenticationService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html'
})
export class TareasComponent implements OnInit {

  tareas:any[] = [];

  constructor(private _tareaService:TareasService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService) {

                this._tareaService.getTareas()
                  .subscribe( data =>{
                    console.log(data);
                    this.tareas= data.data;
                    console.log("holaXDXDXDXD");
                    console.log(this.tareas);
                  }) }

  ngOnInit() {
  }


  borrarTarea(id:string){
      this._tareaService.borrarTarea(id)
          .subscribe(respuesta=>{
            if(respuesta){
              console.log(respuesta);
            this._tareaService.getTareas();
            location.reload(true);
            this.router.navigate(['tareas']);  // ESTO HAY QUE CAMBIARLO A EXPEDIENTE O ALGO ASI quizas
            }else{
              delete this.tareas[id];
            }

          })

    }

}
