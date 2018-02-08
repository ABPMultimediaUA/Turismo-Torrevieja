import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Roles }  from "../../interfaces/roles.interface";
import { AlertService, AuthenticationService, RolesService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-rol',
  templateUrl: './nuevo-rol.component.html'
})
export class NuevoRolComponent implements OnInit {

  errorRol = false;
  rgstrRol = false;
  errorRolActualizar = false;

  nuevo:boolean = false;
  id:string;

  errorMensaje:string[]=[];

  public rol:Roles={
    identificador:"",
    nombreRol:"",
    fechaCreacion:null,
    fechaActualizacion:null,
    fechaEliminacion:null,
  };

  constructor(  private _rolesService: RolesService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
                )
  {
    this.logueadoService.comprobarLogueado();

    this.route.params.subscribe(parametros=>{
      console.log(parametros);
      //TODO: Incorporar la fecha de creacion
    });

  }

  ngOnInit() {
  }

  guardar()

  {
          console.log(this.rol);
          console.log("hola");
            this._rolesService.nuevoRol( this.rol )
              .subscribe( data=>{
                console.log(data);
                this.errorRol = false;
                this.rgstrRol = true;
              },
              error=> {
                let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
                console.log(mensaje.error);

                this.errorMensaje=[];

                            if(mensaje.error=="No posee permisos para ejecutar esta acción")
                            {
                              this.errorMensaje.push("No posee permisos para ejecutar esta acción");
                            }

                            if(mensaje.error=="No estás verificado")
                            {
                              this.errorMensaje.push("No estás verificado");
                            }

                if (typeof(mensaje.error.nombreRol) != "undefined")
                {
                  for(let i=0;i<mensaje.error.nombreRol.length;i++)
                  {
                    this.errorMensaje.push(mensaje.error.nombreRol[i]);
                  }
                }

                console.log(this.errorMensaje);

                this.errorRol = true;
                this.rgstrRol = false;
              },);

    }

  }
