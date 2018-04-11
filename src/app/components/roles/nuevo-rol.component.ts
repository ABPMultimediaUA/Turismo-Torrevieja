import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RolesInterface }  from "../../interfaces/roles.interface";
import { AlertService , PeticionesCrudService } from '../../services/index';

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

  errorMensaje:string[]=[];

  public rol:RolesInterface={
    identificador:"",
    nombreRol:"",
  };

  constructor(  private _rolesService: PeticionesCrudService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                )
  {
    this.route.params.subscribe(parametros=>{ });
  }

  ngOnInit() {
  }

  guardar()
  {
      this._rolesService.crearItem(4,this.rol )
        .then( res=>{
          this.rol = res as RolesInterface;
          this.errorRol = false;
          this.rgstrRol = true;
          //CREAMOS PERMISOS
          for(var i=0; i<this.permisosCambiados.length; i++){
            this._rolesService.actualizarItem(105,this.rol.identificador,null, this.permisosCambiados[i])
              .then(data=>{})
              .catch(error=> {
                let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
                this.errorMensaje.push("Error al añadir algún permiso.");
                this.errorRolActualizar = true;
              });
          }
        })
        .catch( error => {
          let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
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
          this.errorRol = true;
          this.rgstrRol = false;
        });
      if(!this.rgstrRol){
        this.errorMensaje.push("No se ha creado ningún rol antes de añadir los permisos.");
        this.errorRolActualizar = true;
      }
    }

    //GUARDAR ID DE TODOS LOS CHECKBOX MODIFICADOS
    checkboxCambiado(id){
      if(this.permisosCambiados.length == 0){ this.permisosCambiados.push(id); }
      else{
        var existe:number = -1;
        for(var i=0; i<this.permisosCambiados.length; i++){
          if(this.permisosCambiados[i]==id){
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
