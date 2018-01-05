import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Usuario }  from "../interfaces/usuario.interface";
import 'rxjs/Rx';

@Injectable()
export class UsuariosService {

  // heroesURL:string="https://gvent.ovh/Prueba2_1/public/user";
  // First_accessToken:string="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhkMDI0Mzg0NDM3M2NjMzU0NWE0YTNjM2U3NzlkMjRkNjY1YjJhZDc2N2MyZTkxZDAxMTE3ZTdjMjJmNjc0Mzc1NDg4MmVkYTQ2NGQ5ZTliIn0.eyJhdWQiOiIxNSIsImp0aSI6IjhkMDI0Mzg0NDM3M2NjMzU0NWE0YTNjM2U3NzlkMjRkNjY1YjJhZDc2N2MyZTkxZDAxMTE3ZTdjMjJmNjc0Mzc1NDg4MmVkYTQ2NGQ5ZTliIiwiaWF0IjoxNTEzOTYzODM5LCJuYmYiOjE1MTM5NjM4MzksImV4cCI6MTU0NTQ5OTgzOSwic3ViIjoiMTciLCJzY29wZXMiOltdfQ.mRgnWreCL9GHelxZZ6iME5zKfSgveK85BOvNmHq3ZddjOWSJwFlDSIfhex4-CV3034p1W_Fv24uFCp6o8PyQ-xmFrb6aN-lOzIV8kibZOO4IBO-u-pzf02jijiwnKFIpStWK9H5CLBVi_3Cxj4k39RfdH3CfkoUgLIv54JIJ0ANqoRE0WQhnOTxJLEJ8Ldqi6x2zNOE0clzD8F5OuSoNaKw_ESy9EUwChFUrxAX5-qi_cQzrtNJ7C7F13menSlZSxb1yHgIbByrM2PT5Q2GRv5pjPJ-tn6IA-ZXNqRf9QEAOmSZbCWOgMkiOTJ3LjMbaho_7tVDVE8TMS3bamk-KxytXa41_NubfDcdEAZh6OIiPuPd_kIQqgEPZ56mA5OynZraVvliit24gDPtUKahZIsA906-RaXL8G3FY1-fg_yDwOXEhTylvYvkQSBQlrZTuEOVlEKX0F1PFAyDSI2We_E9w0yof-PAtdMlS-YitClkw_nOTswuwa2i4kS-C4SIuaWuw61l0_IPyWbwAp8SQxnjcz_SmvAJx3hT8sbudvlwPXsNC6S7PyK";
  // Secound_accessToken:string="uC92ejGK4SqDp_KIX1XrpSPMNEV99f-yKlPsfL-woWeL4UDny0iysSo2WzJdlR6PR0ouVWJHb8Qj_eavcoTc1sv7Wkx8h5EPINUHg09fqqLeoRGvwi7uE";

  constructor( private http:Http ) { }



private usuarios={};  //hacer aqui peticion de todos los usuarios
// private usuarios:Usuario[]= [
//       {
//         nombreUsuario:"pepe 1",
//         correo:'string',
//         password:'string',
//         password_confirmation:'string',
//         apodo:'string',
//         key$:'string',
//         id:'0'
//       },
//       {
//         nombreUsuario:"pepe 2",
//         correo:'string',
//         password:'string',
//         password_confirmation:'string',
//         apodo:'string',
//         key$:'string',
//         id:'0'
//       }
//     ];


  getUsuarios(){
      return this.usuarios;
  }
  getUsuario( idx:string){
      return this.usuarios[idx];
    }




  // nuevoHeroe( heroe:Usuario )
  // {
  //
  //   let body = JSON.stringify( heroe );//Cambiar todos los valos de heroe a string
  //   let headers = new Headers ({
  //
  //     'Content-Type':'application/json',
  //     'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
  //     'Authorization': this.First_accessToken+this.Secound_accessToken,
  //     //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
  //   });
  //
  //   return this.http.post(  this.heroesURL, body, { headers } )
  //     .map( res=>{
  //       console.log(res.json());
  //     //  return res.json();
  //     })
  // }


usersURL:string='https://prueba-e390a.firebaseio.com/2.json'
userURL:string='https://prueba-e390a.firebaseio.com/'

crearUsuario(user:Usuario){
  let body = JSON.stringify(user);
  let headers = new Headers({
    'Content-Type':'application/json'
  });

  return this.http.post(this.usersURL, body, {headers})
        .map( res=>{
          console.log(res.json() );
          return res.json();
        })
}


modificarUsuario(user:Usuario , key$:string){
  let body = JSON.stringify(user);
  let headers = new Headers({
    'Content-Type':'application/json'
  });

  let url =`${ this.userURL}/${ key$ }.json`;

  return this.http.put(url , body, {headers})
        .map( res=>{
          console.log(res.json() );
          return res.json();
        })
}

borrarUsuario(key$:string){

  let url=`${ this.userURL}/${ key$ }.json`;

  return this.http.delete( url )
        .map(  res=> res.json())
}

peticionUsuarios(){
  return this.http.get(this.userURL)
      .map( res=>res.json());
}



}
