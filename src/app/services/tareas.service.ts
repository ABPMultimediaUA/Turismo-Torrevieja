import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Tarea }  from "../interfaces/tarea.interface";
import 'rxjs/Rx';

@Injectable()
export class TareasService {

  tareasURL:string="https://gvent.ovh/Prueba2_1/public/misTareas";
  tareaURL:string="https://gvent.ovh/Prueba2_1/public/misTareas";
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;
  constructor( private http:Http ) { }

  nuevaTarea( tarea:Tarea)
  {

    let body = JSON.stringify( tarea );//Cambiar todos los valos de heroe a string
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("body. tarea que quiero postear: "+body);
    return this.http.post(  this.tareasURL, body, { headers } )
      .map( res=>{
        console.log(localStorage.accesToken);
        console.log(res.json());
      (res: Response) => res.json();
      })
  }

  actualizarTarea ( tarea:Tarea, id:string){
    // if(tarea.password=="" ){
    //   delete tarea.password;
    //   delete tarea.password_confirmation;
    //
    // }
    console.log(tarea);
    let body = JSON.stringify( tarea ); //pasarlo a string

    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });

  let url = `${this.tareaURL}/${id}`;

  return this.http.put (url,body, { headers })//estoes lo quemandas
      .map( res=>{ //transformar la data que viene
        console.log(res.json());
        return res.json();
    })
  }



  getTarea(id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    let url = `${this.tareaURL}/${id}`;
    console.log("Hola2 "+url);
    return this.http.get(url, { headers })
      .map( res=>res.json());
  }



  getTareas(){
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    let url = `${this.tareaURL}`;
    console.log("url a la que pido:");
    console.log(url);
    return this.http.get(url, { headers })
      .map( res=>res.json()); //aqui llamo a esa url y transformo el json
  }

// "https://gvent.ovh/Prueba2_1/public/user?page=2"

  borrarTarea( id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
      let url = `${this.tareasURL}/${id}`;
      return this.http.delete(url, { headers })
          .map(res => res.json())
    }






}
