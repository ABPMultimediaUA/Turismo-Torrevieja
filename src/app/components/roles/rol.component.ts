import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Roles }  from "../../interfaces/roles.interface";
import { Permisos }  from "../../interfaces/permisos.interface";
import { AlertService, AuthenticationService, RolesService, LogueadoService } from '../../services/index';
@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html'
})
export class RolComponent implements OnInit {
  errorRolActualizar = false;
  rolActualizado = false;
  permisosCambiados:string[]=[];
  auxPermisos:string[]=[];
  id:string;

  errorMensaje:string[]=[];

  public rol:Roles={
    identificador:"",
    nombreRol:"",
    fechaCreacion:null,
    fechaActualizacion:null,
    fechaEliminacion:null,
  };

  public permiso:Permisos={
    identificador:"",
    nombrePermiso:"",
  };

constructor(  private _rolService: RolesService,
              private router:Router,
              private route:ActivatedRoute,//esto es para pasar como parametro
              public  logueadoService: LogueadoService
            )
{
    this.logueadoService.comprobarLogueado();

    this.route.params.subscribe(parametros=>{
          this.id = parametros['id']
          this._rolService.getRol(this.id)
              .subscribe( rol => {rol.data.password="",   this.rol = rol.data})

          this._rolService.getPermisos(this.id)
              .subscribe( permiso => {this.permiso = permiso.data, this.marcarPermisos()})
    });
  }

  ngOnInit() {
  }

  guardar()
  {
    //ACTUALIZAMOS NOMBRE ROL
    this._rolService.actualizarRol(this.rol, this.id)
      .subscribe(data=>{ this.errorRolActualizar = false; },
      error=> {
        let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON

        this.errorMensaje=[];

        if(mensaje.error=="No posee permisos para ejecutar esta acción"){
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
        console.log(this.errorMensaje);
        this.errorRolActualizar = true;
      },);

      //ACTUALIZAMOS PERMISOS
      for(var i=0; i<this.permisosCambiados.length; i++){
        if(this.auxPermisos.includes(this.permisosCambiados[i])){
          //Eliminamos (Si el permiso guardado en el aux existia, se elimina)
          this._rolService.borrarPermisos(this.id, this.permisosCambiados[i])
            .subscribe(data=>{},
            error=> {
              let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
              this.errorMensaje.push("Error al eliminar algún permiso.");
              this.errorRolActualizar = true;
            },);
        }
        else{
          //Guardamos (Si el permiso que se ha cambiado no existia en el aux, se guarda)
          this._rolService.nuevoPermiso(this.id, this.permisosCambiados[i])
            .subscribe(data=>{},
            error=> {
              let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
              this.errorMensaje.push("Error al añadir algún permiso.");
              this.errorRolActualizar = true;
            },);
        }
      }
      //SI LA ACTUALIZACION HA SIDO CORRECTA
      if(!this.errorRolActualizar){
        this.rolActualizado = true;
        this.router.navigate(['roles']);
      }
    }

    //MARCA COMO TRUE TODOS LOS CHECKBOX/PERMISOS QUE TENGA EL ROL
    marcarPermisos(){
      for(var i=0; i<Object.keys(this.permiso).length; i++){
          try{
            this.auxPermisos.push(this.permiso[i].identificador); //CREAMOS UN ARRAY A PARTIR DE PERMISO
            document.getElementById(this.permiso[i].identificador).setAttribute("checked","checked");
          }catch(error){ console.log("No existe permiso " + error); }
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
