import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Roles }  from "../interfaces/roles.interface";

@Injectable()
export class RolesService {

  rolesURL:string="https://gvent.ovh/Prueba2_1/public/rol";
  rolURL:string="https://gvent.ovh/Prueba2_1/public/rol";
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
    console.log("body. rol que quiero postear: "+body);
    return this.http.post(  this.rolesURL, body, { headers } )
      .map( res=>{
        console.log(localStorage.accesToken);
        console.log(res.json());
      (res: Response) => res.json();
      })
  }

  actualizarRol ( rol:Roles, id:string){
    if(rol.nombreRol=="" ){
      delete rol.nombreRol;
    }
    console.log(rol);
    let body = JSON.stringify( rol ); //pasarlo a string

    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });

    let url = `${this.rolURL}/${id}`;

    return this.http.put (url,body, { headers })//estoes lo quemandas
      .map( res=>{ //transformar la data que viene
        console.log(res.json());
        return res.json();
    })
  }

  getRol(id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    let url = `${this.rolURL}/${id}`;
    console.log("Hola2 "+url);
    return this.http.get(url, { headers })
      .map( res=>res.json());
  }


  getRoles(pagina:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("pagina que paso a getusuarios:");
    console.log(pagina);
    let url = `${this.rolURL}/?page=${pagina}`;
    console.log("url a la que pido:");
    console.log(url);
    console.log(this.http.get("https://gvent.ovh/Prueba2_1/public/rol?page=3", { headers })
      .subscribe( res=>res.json()) );
    return this.http.get("https://gvent.ovh/Prueba2_1/public/rol?page=3", { headers })
      .map( res=>res.json()); //aqui llamo a esa url y transformo el json
  }

  borrarRoles( id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
      let url = `${this.rolesURL}/${id}`;
      return this.http.delete(url, { headers })
          .map(res => res.json())
    }

}
