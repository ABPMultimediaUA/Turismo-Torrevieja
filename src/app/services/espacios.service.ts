import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Espacio }  from "../interfaces/espacio.interface";
import 'rxjs/Rx';

@Injectable()
export class EspaciosService {

  espaciosURL:string="https://gvent.ovh/Prueba2_1/public/espacio";
  espacioURL:string="https://gvent.ovh/Prueba2_1/public/espacio";
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;
  constructor( private http:Http ) { }

  nuevoEspacio( espacio:Espacio )
  {

    let body = JSON.stringify( espacio );//Cambiar todos los valos de heroe a string
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("body. espacio que quiero postear: "+body);
    return this.http.post(  this.espaciosURL, body, { headers } )
      .map( res=>{
        console.log(localStorage.accesToken);
        console.log(res.json());
      (res: Response) => res.json();
      })
  }

  getEspacio(id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    let url = `${this.espacioURL}/${id}`;
    console.log("Hola2 "+url);
    return this.http.get(url, { headers })
      .map( res=>res.json());
  }


  getEspacios(pagina:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("pagina que paso a getusuarios:");
    console.log(pagina);
    let url = `${this.espacioURL}/?page=${pagina}`;
    console.log("url a la que pido:");
    console.log(url);
    console.log(this.http.get("https://gvent.ovh/Prueba2_1/public/espacio?page=3", { headers })
      .subscribe( res=>res.json()) );
    return this.http.get("https://gvent.ovh/Prueba2_1/public/espacio?page=3", { headers })
      .map( res=>res.json()); //aqui llamo a esa url y transformo el json
  }

  borrarEspacio( id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
      let url = `${this.espaciosURL}/${id}`;
      return this.http.delete(url, { headers })
          .map(res => res.json())
    }

}
