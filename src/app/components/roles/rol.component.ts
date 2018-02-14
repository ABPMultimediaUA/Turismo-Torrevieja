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
            ) {
              this.logueadoService.comprobarLogueado();

          this.route.params.subscribe(parametros=>{
                console.log(parametros);
                this.id = parametros['id']

                this._rolService.getRol(this.id)
                    .subscribe( rol => {rol.data.password="",   this.rol = rol.data, console.log(rol)})

                this._rolService.getPermisos(this.id)
                    .subscribe( permiso => {this.permiso = permiso.data, this.marcarPermisos()})
                    //.data si lo quitas obtienes un array / data.data te da el array
          });
  }

  ngOnInit() {
  }

  guardar()
  {
    //ACTUALIZAMOS NOMBRE ROL
    //console.log("entra en actualizar rol");
    this._rolService.actualizarRol(this.rol, this.id)
      .subscribe(data=>{
        console.log("data que queremos actualizar"+data);
        this.errorRolActualizar = false;
      },
      error=> {
        //console.log(error);
        let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
        console.log(mensaje.error);

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
            .subscribe(data=>{
              console.log("permiso data que queremos eliminar "+data);
            },
            error=> {
              //console.log(error);
              let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
              console.log(mensaje.error);
              this.errorMensaje.push("Error al eliminar algún permiso.");
              this.errorRolActualizar = true;
            },);
        }
        else{
          //Guardamos (Si el permiso que se ha cambiado no existia en el aux, se guarda)
          this._rolService.nuevoPermiso(this.id, this.permisosCambiados[i])
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
      //SI LA ACTUALIZACION HA SIDO CORRECTA
      if(!this.errorRolActualizar){
        this.rolActualizado = true;
        this.router.navigate(['roles']);
      }
    }

    //MARCA COMO TRUE TODOS LOS CHECKBOX/PERMISOS QUE TENGA EL ROL
    marcarPermisos(){
      //console.log(this.permiso);
      for(var i=0; i<Object.keys(this.permiso).length; i++){
        //console.log(this.permiso[i].identificador);
          try{
            this.auxPermisos.push(this.permiso[i].identificador); //CREAMOS UN ARRAY A PARTIR DE PERMISO
            //console.log(this.auxPermisos);
            document.getElementById(this.permiso[i].identificador).setAttribute("checked","checked");
          }catch(error){ console.log("No existe permiso " + error); }
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
