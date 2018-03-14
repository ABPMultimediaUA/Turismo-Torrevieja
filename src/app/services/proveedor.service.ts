import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Proveedor }  from "../interfaces/proveedor.interface";

@Injectable()
export class ProveedorService {

  proveedoresURL:string="https://gvent.ovh/Prueba2_1/public/proveedor";

  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;

  constructor(private http:Http) { }




    getProveedores(){
      let headers = new Headers ({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
        'Authorization': this.First_accessToken+this.Secound_accessToken,

        //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
      });
      let url = this.proveedoresURL;
      return this.http.get(url, { headers })
          .map( res=>res.json());
    }


    getProveedor(id:string){
      let headers = new Headers ({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
        'Authorization': this.First_accessToken+this.Secound_accessToken,
      });
      let url = `${this.proveedoresURL}/${id}`;
      return this.http.get(url, { headers })
        .map( res=>res.json());
    }


  nuevoProveedor(proveedor:Proveedor){
      let body = JSON.stringify( proveedor );
      let headers = new Headers ({
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
        'Authorization': this.First_accessToken+this.Secound_accessToken,

      });
      return this.http.post(  this.proveedoresURL, body, { headers } )
        .map( res=>{
          console.log(localStorage.accesToken);
          console.log(res.json());
        (res: Response) => res.json();
        })

  }

  modificarProveedor(proveedor:Proveedor,id:string){
    let body = JSON.stringify( proveedor );
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
  let url = `${this.proveedoresURL}/${id}`;
  return this.http.put (url,body, { headers })
      .map( res=>{
        console.log(res.json());
        return res.json();
    })
  }

  borrarProveedor( id:string){
    let headers = new Headers ({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
      'Authorization': this.First_accessToken+this.Secound_accessToken,
    });
      let url = `${this.proveedoresURL}/${id}`;
      return this.http.delete(url, { headers })
          .map(res => res.json())
    }


}
