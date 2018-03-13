import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Tarea }  from "../../interfaces/tarea.interface";
import { AlertService, AuthenticationService, LogueadoService } from '../../services/index';
import { TareasService } from '../../services/tareas.service';
@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.component.html'
})
export class NuevaTareaComponent implements OnInit {

  public tarea:Tarea={
  };
  id:string;
  errorTarea = false;
  nuevoTarea = false;
  errorMensaje:string[]=[];

  constructor(private _tareaService:TareasService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService) {

                this.logueadoService.comprobarLogueado();

                this.route.params.subscribe(parametros=>{
                      console.log(parametros);
                      }); }

  ngOnInit() {
  }

  guardar(){
          console.log(this.tarea);
          console.log("hola");
            this._tareaService.nuevoTarea( this.tarea )
              .subscribe( data=>{
                console.log(data);
                this.errorTarea = false;
                this.nuevoTarea = true;

              },
              error=> {
                let mensaje=JSON.parse(error._body);
                console.log(mensaje.error);
                this.errorMensaje=[];

                if(mensaje.error=="No posee permisos para ejecutar esta acción"){
                              this.errorMensaje.push("No posee permisos para ejecutar esta acción");
                }

                if(mensaje.error=="No estás verificado"){
                              this.errorMensaje.push("No estás verificado");
                }

                this.errorTarea = true;
                this.nuevoTarea = false;
              },);
    }

}
