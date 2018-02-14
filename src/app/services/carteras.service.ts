import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Cartera }  from "../interfaces/cartera.interface";
import 'rxjs/Rx';

@Injectable()
export class CarterasService {

  carterasURL:string="https://gvent.ovh/Prueba2_1/public/cartera";
  carteraURL:string="https://gvent.ovh/Prueba2_1/public/cartera";
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;
  constructor( private http:Http ) { }

  nuevaCartera( cartera:Cartera )
  {

    let body = JSON.stringify( cartera );//Cambiar todos los valos de heroe a string
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("body. cartera que quiero postear: "+body);
    return this.http.post(  this.carterasURL, body, { headers } )
      .map( res=>{
        console.log(localStorage.accesToken);
        console.log(res.json());
      (res: Response) => res.json();
      })
  }

  actualizarCartera ( cartera:Cartera, id:string){
    // if(usuario.password=="" ){
    //   delete usuario.password;
    //   delete usuario.password_confirmation;
    //
    // }
    console.log(cartera);
    let body = JSON.stringify( cartera ); //pasarlo a string

    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });

  let url = `${this.carteraURL}/${id}`;

  return this.http.put (url,body, { headers })//estoes lo quemandas
      .map( res=>{ //transformar la data que viene
        console.log(res.json());
        return res.json();
    })
  }



  getCartera(id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });

    let url = `${this.carteraURL}/${id}`;
    console.log("Hola2 "+url);
    return this.http.get(url, { headers })
      .map( res=>res.json());
  }
  // getUsuariosantiguo
  // getUsuarios(pagina:string){
  //   let headers = new Headers ({
  //
  //     'Content-Type':'application/json',
  //     'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
  //     'Authorization': this.First_accessToken+this.Secound_accessToken,
  //
  //     //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
  //   });
  //   console.log("pagina que paso a getusuarios:");
  //   console.log(pagina);
  //   let url = `${this.usuarioURL}/?page=${pagina}`;
  //   console.log("url a la que pido:");
  //   console.log(url);
  //   console.log(this.http.get("https://gvent.ovh/Prueba2_1/public/user?page=3", { headers })
  //     .subscribe( res=>res.json()) );
  //   return this.http.get("https://gvent.ovh/Prueba2_1/public/user?page=3", { headers })
  //     .map( res=>res.json()); //aqui llamo a esa url y transformo el json
  // }


  getCarteras(pagina:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
    console.log("carteraURL:");
    let url2 = `${this.carteraURL}`;
    console.log(url2);
    console.log(this.http.get("https://gvent.ovh/Prueba2_1/public/cartera", { headers })
      .subscribe( res=>res.json()) );


    console.log("pagina que paso a getcarteras:");
    console.log(pagina);
    let url = `${this.carteraURL}/?page=${pagina}`;
    console.log("url a la que pido:");
    console.log(url);
    console.log(this.http.get("https://gvent.ovh/Prueba2_1/public/cartera?page=3", { headers })
      .subscribe( res=>res.json()) );
    return this.http.get("https://gvent.ovh/Prueba2_1/public/cartera?page=3", { headers })
      .map( res=>res.json()); //aqui llamo a esa url y transformo el json
  }

// "https://gvent.ovh/Prueba2_1/public/user?page=2"

  borrarCartera( id:string){
    let headers = new Headers ({

      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,

      //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
    });
      let url = `${this.carterasURL}/${id}`;
      return this.http.delete(url, { headers })
          .map(res => res.json())
    }






}
