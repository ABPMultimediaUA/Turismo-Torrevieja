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
  permisosCambiados:string[]=[];

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
    });

  }

  ngOnInit() {
  }

  guardar()
  {
      this._rolesService.nuevoRol( this.rol )
        .subscribe( res=>{
          this.rol = res.data;
          console.log("GUARDANDO ROL VER DATA  " + this.rol);
          this.errorRol = false;
          this.rgstrRol = true;
          //this.id = res.identificador
        },
        error=> {
          let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
          //console.log(mensaje.error)
          this.errorMensaje=[];

                      if(mensaje.error=="No posee permisos para ejecutar esta acción") {
                        this.errorMensaje.push("No posee permisos para ejecutar esta acción");
                      }
                      if(mensaje.error=="No estás verificado"){
                        this.errorMensaje.push("No estás verificado");
                      }
          if (typeof(mensaje.error.nombreRol) != "undefined"){
            for(let i=0;i<mensaje.error.nombreRol.length;i++){
              this.errorMensaje.push(mensaje.error.nombreRol[i]);
            }
          }
          //console.log(this.errorMensaje);
          this.errorRol = true;
          this.rgstrRol = false;
        },);

      if(this.rgstrRol){
        for(var i=0; i<this.permisosCambiados.length; i++){
        //Guardamos (Si el permiso que se ha cambiado no existia en el aux, se guarda)
        //TODO Obtener el id del rol recien creado
        this._rolesService.nuevoPermiso(this.id, this.permisosCambiados[i])
          .subscribe(data=>{
            console.log("permiso data que queremos añadir "+data);
          },
          error=> {
            //console.log(error);
            let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
            console.log(mensaje.error);
            this.errorMensaje.push("Error al añadir algún permiso.");
            this.errorRolActualizar = true;
          },);
        }
      }
      else{
        this.errorMensaje.push("No se ha creado ningún rol antes de añadir los permisos.");
        this.errorRolActualizar = true;
      }
    }

    //GUARDAR ID DE TODOS LOS CHECKBOX MODIFICADOS
    checkboxCambiado(id){
      //console.log(id);
      if(this.permisosCambiados.length == 0){ this.permisosCambiados.push(id); }
      else{
        var existe:number = -1;
        for(var i=0; i<this.permisosCambiados.length; i++){
          if(this.permisosCambiados[i]==id){
            //console.log("son iguales");
            existe = i;
            i=this.permisosCambiados.length;
          }
        }
        if(existe == -1) this.permisosCambiados.push(id);
        else this.permisosCambiados.splice(existe);
      }
      //for(var i=0; i<this.permisosCambiados.length; i++) console.log("bucle " + this.permisosCambiados[i]);
    }
  }
