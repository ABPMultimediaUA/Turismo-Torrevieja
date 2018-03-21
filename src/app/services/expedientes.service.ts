import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { ExpedienteInterfaz }  from "../interfaces/expediente.interface";
import 'rxjs/Rx';

@Injectable()
export class ExpedientesService {

  expedientesURL:string="https://gvent.ovh/Prueba2_1/public/expediente";
  expedienteURL:string="https://gvent.ovh/Prueba2_1/public/expediente";
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;
  constructor( private http:Http ) { }

  nuevoExpediente( expediente:ExpedienteInterfaz)
  {

    let body = JSON.stringify( expediente );//Cambiar todos los valos de heroe a string
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("body. expediente que quiero postear: "+body);
    return this.http.post(  this.expedientesURL, body, { headers } )
      .map( res=>{
        console.log(localStorage.accesToken);
        console.log(res.json());
      (res: Response) => res.json();
      })
  }

  actualizarExpediente ( expediente:ExpedienteInterfaz, id:string){
    // if(evento.password=="" ){
    //   delete evento.password;
    //   delete evento.password_confirmation;
    //
    // }
    console.log(expediente);
    let body = JSON.stringify( expediente ); //pasarlo a string

    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });

  let url = `${this.expedienteURL}/${id}`;

  return this.http.put (url,body, { headers })//estoes lo quemandas
      .map( res=>{ //transformar la data que viene
        console.log(res.json());
        return res.json();
    })
  }



  getExpediente(id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    let url = `${this.expedienteURL}/${id}`;
    console.log("Hola2 "+url);
    return this.http.get(url, { headers })
      .map( res=>res.json());
  }



  getExpedientes(pagina:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("pagina que paso a getexpedientes:");
    console.log(pagina);
    let url = `${this.expedienteURL}/?page=${pagina}`;
    console.log("url a la que pido:");
    console.log(url);
    console.log(this.http.get("https://gvent.ovh/Prueba2_1/public/expediente?page=3", { headers })
      .subscribe( res=>res.json()) );
    return this.http.get("https://gvent.ovh/Prueba2_1/public/expediente?page=3", { headers })
      .map( res=>res.json()); //aqui llamo a esa url y transformo el json
  }

// "https://gvent.ovh/Prueba2_1/public/user?page=2"

  borrarExpediente( id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
      let url = `${this.expedientesURL}/${id}`;
      return this.http.delete(url, { headers })
          .map(res => res.json())
    }






}
