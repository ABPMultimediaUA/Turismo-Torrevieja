import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Roles }  from "../interfaces/roles.interface";
import { Permisos }  from "../interfaces/permisos.interface";

@Injectable()
export class RolesService {

  //ROLES
  rolesURL:string="https://gvent.ovh/Prueba2_1/public/rol";
  rolURL:string="https://gvent.ovh/Prueba2_1/public/rol";

  //PERMISOS
  //(coger permisos del rol 2)
  //https://gvent.ovh/Prueba2_1/public/rols/2/permisos
  permisosURL:string="https://gvent.ovh/Prueba2_1/public/rols";
  //(insertar al rol 2 el permiso 4, con PUT; con DELETE se eliminaria)
  //https://gvent.ovh/Prueba2_1/public/rol/2/permiso/4
  permisoURL:string="https://gvent.ovh/Prueba2_1/public/rol";

  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;

  constructor( private http:Http ) { }

  nuevoRol ( rol:Roles ){
    let body = JSON.stringify( rol );//Cambiar todos los valos de heroe a string
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    return this.http.post(  this.rolesURL, body, { headers } );
  }

  actualizarRol ( rol:Roles, id:string){
    if(rol.nombreRol=="" ){
      delete rol.nombreRol;
    }
    let body = JSON.stringify( rol ); //pasarlo a string

    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
    let url = `${this.rolURL}/${id}`;
    return this.http.put (url,body, { headers }).map( res=>{ return res.json(); })
  }

  getRol(id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
    let url = `${this.rolURL}/${id}`;
    return this.http.get(url, { headers })
      .map( res=>res.json());
  }


  getRoles(pagina:string){
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
    let url = `${this.rolURL}/?page=${pagina}`;
    return this.http.get("https://gvent.ovh/Prueba2_1/public/rol?page=3", { headers })
      .map( res=>res.json()); //aqui llamo a esa url y transformo el json
  }

  borrarRoles( id:string){
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
      let url = `${this.rolesURL}/${id}`;
      return this.http.delete(url, { headers }).map(res => res.json())
  }

  //**************PERMISOS*****************
  getPermisos(id:string){
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
    let url = `${this.permisosURL}/${id}/permisos`;
    return this.http.get(url, { headers }).map( res=>res.json());
  }

  nuevoPermiso ( ident_rol:string, ident_per:string ){
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
      let url = `${this.permisoURL}/${ident_rol}/permiso/${ident_per}`;
      let body = null;
      return this.http.put(url, body, { headers }).map(res => res.json())
  }

  borrarPermisos( ident_rol:string){
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
      let url = `${this.permisoURL}/${ident_rol}/permiso/}`;
      return this.http.delete(url, { headers }).map(res => res.json())
  }
}
