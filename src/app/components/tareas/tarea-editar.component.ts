import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Tarea }  from "../../interfaces/tarea.interface";
import { TareasService } from '../../services/tareas.service';
import { AlertService, AuthenticationService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-tarea-editar',
  templateUrl: './tarea-editar.component.html'
})
export class TareaEditarComponent implements OnInit {

  public tarea:Tarea={
  };
  id:string;
  errorTareaModificar = false;
  errorMensaje:string[]=[];

  constructor(private _tareaService:TareasService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService) {

                this.route.params.subscribe(parametros=>{this.id = parametros['id']

                this._tareaService.getTarea(this.id)
                  .subscribe( data =>{
                    console.log(data);
                    this.tarea= data.data;
                    console.log("holaXDXDXDXD");
                    console.log(this.tarea);
                  })

               }); }

  ngOnInit() {
  }

  guardar(){
        //actualizando
        console.log("voy a actualizar un proveedor");
        this._tareaService.modificarTarea(this.tarea, this.id)
            .subscribe(data=>{
              console.log("data que queremos actualizar"+data);
              this.errorTareaModificar = false;
                this.router.navigate(['proveedores']);
            },
            error=> {
              let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
              console.log(mensaje.error);
              this.errorMensaje=[];

              if(mensaje.error=="No posee permisos para ejecutar esta acción"){
                  this.errorMensaje.push("No posee permisos para ejecutar esta acción");
              }

              if(mensaje.error=="No estás verificado"){
                  this.errorMensaje.push("No estás verificado");
              }
              if (typeof(mensaje.error.nombreUsuario) != "undefined"){
                for(let i=0;i<mensaje.error.nombreUsuario.length;i++){
                  this.errorMensaje.push(mensaje.error.nombreUsuario[i]);
                }
              }
              console.log(this.errorMensaje);

              this.errorTareaModificar =true;
            },);
        }

}
