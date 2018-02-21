import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Evento }  from "../interfaces/evento.interface";
import 'rxjs/Rx';

@Injectable()
export class EventosService {

  eventosURL:string="https://gvent.ovh/Prueba2_1/public/evento";
  eventoURL:string="https://gvent.ovh/Prueba2_1/public/evento";
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;
  constructor( private http:Http ) { }

  nuevoEvento( evento:Evento)
  {

    let body = JSON.stringify( evento );//Cambiar todos los valos de heroe a string
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("body. evento que quiero postear: "+body);
    return this.http.post(  this.eventosURL, body, { headers } )
      .map( res=>{
        console.log(localStorage.accesToken);
        console.log(res.json());
      (res: Response) => res.json();
      })
  }

  actualizarEvento ( evento:Evento, id:string){
    // if(evento.password=="" ){
    //   delete evento.password;
    //   delete evento.password_confirmation;
    //
    // }
    console.log(evento);
    let body = JSON.stringify( evento ); //pasarlo a string

    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });

  let url = `${this.eventoURL}/${id}`;

  return this.http.put (url,body, { headers })//estoes lo quemandas
      .map( res=>{ //transformar la data que viene
        console.log(res.json());
        return res.json();
    })
  }



  getEvento(id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    let url = `${this.eventoURL}/${id}`;
    console.log("Hola2 "+url);
    return this.http.get(url, { headers })
      .map( res=>res.json());
  }



  getEventos(pagina:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("pagina que paso a geteventos:");
    console.log(pagina);
    let url = `${this.eventoURL}/?page=${pagina}`;
    console.log("url a la que pido:");
    console.log(url);
    console.log(this.http.get("https://gvent.ovh/Prueba2_1/public/evento?page=3", { headers })
      .subscribe( res=>res.json()) );
    return this.http.get("https://gvent.ovh/Prueba2_1/public/evento?page=3", { headers })
      .map( res=>res.json()); //aqui llamo a esa url y transformo el json
  }

// "https://gvent.ovh/Prueba2_1/public/user?page=2"

  borrarEvento( id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
      let url = `${this.eventosURL}/${id}`;
      return this.http.delete(url, { headers })
          .map(res => res.json())
    }






}
