import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RolesInterface }  from "../../interfaces/roles.interface";
import { PermisosInterface }  from "../../interfaces/permisos.interface";
import { AlertService, AuthenticationService, PeticionesCrudService } from '../../services/index';
@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html'
})
export class RolComponent implements OnInit {
  errorRolActualizar = false;
  rolActualizado = false;
  permisosCambiados:string[]=[];
  id:string;

  errorMensaje:string[]=[];

  public rol:RolesInterface={
    identificador:"",
    nombreRol:"",
  };

  public permiso:PermisosInterface[];

constructor(  private _rolService: PeticionesCrudService,
              private router:Router,
              private route:ActivatedRoute,//esto es para pasar como parametro
            )
  {

    this.route.params.subscribe(parametros=>{
      this.id = parametros['id'];

      //CARGAMOS ROL
      this._rolService.getItem(4,this.id,-1,-1).then(
        res => { this.rol = res as RolesInterface; });

      //CARGAMOS PERMISOS
      this._rolService.getItem(104,this.id,-1,-1).then(
        res => {
          this.permiso = res as PermisosInterface[];
          this.marcarPermisos();
        });
    });
  }

  ngOnInit() {
  }

  guardar()
  {
    //ACTUALIZAMOS NOMBRE ROL
    this._rolService.actualizarItem(4,this.id,this.rol,-1)
      .then(data=>{ this.errorRolActualizar = false; })
      .catch( error=> {
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
      });

      //ACTUALIZAMOS PERMISOS
      for(var i=0; i<this.permisosCambiados.length; i++){
        if(this.existeRol(this.permisosCambiados[i])){
          //Eliminamos (Si el permiso aux existia, se elimina)
          this._rolService.eliminarItem(105,this.id,this.permisosCambiados[i])
            .then(data=>{})
            .catch( error=> {
              let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
              this.errorMensaje.push("Error al eliminar algún permiso.");
              this.errorRolActualizar = true;
            },);
        }
        else{
          //Guardamos (Si el permiso no existia, se guarda)
          this._rolService.actualizarItem(105,this.id, null,this.permisosCambiados[i])
            .then(data=>{})
            .catch( error=> {
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
      for(var i=0; i<this.permiso.length; i++){
          try{
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
    }

    //COMPROBAR SI EXISTE UN PERMISO EN EL ARRAY PERMISOS
    existeRol(i:string){
      var r:boolean = false;
      for(var x = 0; x<this.permiso.length; x++){
        if(this.permiso[x].identificador == i){
          r = true;
          x=this.permiso.length;
        }
      }
      return r;
    }

}
