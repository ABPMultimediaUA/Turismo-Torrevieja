import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Usuario }  from "../interfaces/usuario.interface";
import 'rxjs/Rx';

@Injectable()
export class UsuariosService {

  usuariosURL:string="https://gvent.ovh/Prueba2_1/public/user";
  usuarioURL:string="https://gvent.ovh/Prueba2_1/public/user";
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;
  constructor( private http:Http ) { }

  nuevoUsuario( usuario:Usuario )
  {

    let body = JSON.stringify( usuario );//Cambiar todos los valos de heroe a string
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("body. usuario que quiero postear: "+body);
    return this.http.post(  this.usuariosURL, body, { headers } )
      .map( res=>{
        console.log(localStorage.accesToken);
        console.log(res.json());
      (res: Response) => res.json();
      })
  }

  actualizarUsuario ( usuario:Usuario, id:string){
    if(usuario.password=="" ){
      delete usuario.password;
      delete usuario.password_confirmation;

    }
    console.log(usuario);
    let body = JSON.stringify( usuario ); //pasarlo a string

    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });

  let url = `${this.usuarioURL}/${id}`;

  return this.http.put (url,body, { headers })//estoes lo quemandas
      .map( res=>{ //transformar la data que viene
        console.log(res.json());
        return res.json();
    })
  }



  getUsuario(id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    let url = `${this.usuarioURL}/${id}`;
    console.log("Hola2 "+url);
    return this.http.get(url, { headers })
      .map( res=>res.json());
  }




  getUsuarios(){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    return this.http.get(this.usuariosURL, { headers })
      .map( res=>res.json()); //aqui llamo a esa url y transformo el json
  }

  borrarUsuario( id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
      let url = `${this.usuariosURL}/${id}`;
      return this.http.delete(url, { headers })
          .map(res => res.json())
    }






}
