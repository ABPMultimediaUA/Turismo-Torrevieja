import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment";

@Injectable()
export class PeticionesCrudService {

  //TOKEN
  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;

  //CABECERA
  header = new Headers ({
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
    'Authorization': this.First_accessToken+this.Secound_accessToken,
  });

  constructor( private http:Http ) { }

  //FUNCION QUE CREA LAS URL
  crearURL(
    tipo:number,      //La tabla / peticion que se quiere realizar
    id:number,        //Id de item a buscar
    id2:number,       //Segundo id para tablas combinadas
    item_pgn:number,  //Cantidad de elementos por pgn (cuando id = -1)
    pgn:number,       //Pgn que se quiere obtener
    busqueda:string,  //Para las peticiones que contienen una busqueda
    orderBy:string    //Variable por la cual se va a ordenar una select
  ){
    let url = "https://gvent.ovh/Prueba2_1/public/";

    switch(tipo) {
<<<<<<< HEAD
      case 0:
          //Sin id muestra todos los items
          //Con id crud
          url += "expediente";
          break;
      case 1:
          //Sin id muestra todos los items
          //Con id crud
          url += "actividad";
          break;
      case 2:
          //Sin id muestra todos los items
          //Con id crud
          url += "tarea";
          break;
      case 3:
          //Sin id muestra todos los items
          //Con id crud
          url += "contrato";
          break;
      case 4:
          //Sin id muestra todos los items
          //Con id crud
          url += "rol";
          break;
      case 5:
          //Sin id muestra todos los items
          //Con id crud
          url += "user";
          break;
      case 6:
          //Sin id muestra todos los items
          //Con id crud
          url += "espacio";
          break;
      case 7:
          //Sin id muestra todos los items
          //Con id crud
          url += "proveedor";
          break;
      case 8:
          //Sin id muestra todos los items
          //Con id crud
          url += "cartera";
          break;
      case 50:
          //Cartera aprobada: no se puede añadir expediente ni eliminar
          // url += "cartera?estado=3";
          url += "cartera?estado=2";
          break;
      case 51:
          //Cartera sin aprobar: se puede añadir expediente y eliminar
          // url += "cartera?estado=1";
          url += "cartera?estado=1";
          break;
      case 52:
          //Cartera terminada: no se puede añadir expediente ni eliminar ni editar
          // url += "cartera?estado=5";
          url += "cartera?estado=3";
          break;
      case 101:
          //Todas las actividades de un expediente
          url += `DeExpediente/${id}/actividades`;
          break;
      case 102:
          //Todas las tareas de un expediente
          url += `DeExpediente/${id}/tareas`;
          break;
      case 103:
          //Todas los contratos de un expediente
          url += `DeExpediente/${id}/contratos`;
          break;
      case 104:
          //Todos los permisos de un id rol
          url += `rols/${id}/permisos`;
          break;
      case 105:
          //Insertar o eliminar a un id rol un permiso id2, utiliza put (actualizar)
          url += `rol/${id}/permiso/${id2}`;
          break;
      case 106:
          //Insertar o eliminar a un id rol un permiso id2, utiliza put (actualizar)
          url += `DeCartera/${id}/expedientes`;
          break;
      case 107:
          //Todas las tareas de un usuario
          url += `misTareas`;
          break;
      case 201:
          //Insertar imagen en expediente
          url += `expediente/${id}/?imagen`;
          break;
      case 301:
          //Todas las carteras con estado 1 (pueden crear eventos)
          // url += `cartera?estado=1`;
          break;
      case 302:
          //Todas las carteras con estado 2 (pueden crear eventos)
          // url += `cartera?estado=2`;
          break;
      case 303:
          //Realiza busqueda teniendo en cuenta todos sus campos, en id se pasa lo escrito
          url += `BusquedaEspacio/${id}`;
          break;
      case 304:
          //Realiza busqueda teniendo en cuenta todos sus campos, en id se pasa lo escrito
          url += `BusquedaProveedor/${id}`;
          break;
      case 305:
          //Realiza busqueda teniendo en cuenta todos sus campos, en id se pasa lo escrito
          url += `BusquedaUser/${id}`;
          break;
      case 306:
          //Realiza busqueda teniendo en cuenta todos sus campos, en id se pasa lo escrito
          url += `BusquedaRol/${id}`;
          break;
      case 307:
          //Realiza busqueda teniendo en cuenta todos sus campos, en id se pasa lo escrito
          url += `BusquedaCartera/${id}`;
          break;
      default:
          console.log("No se ha especificado correctamente una URL.");
    }
    if(id>-1 && tipo <101) url+=`/${id}`;
    if(id2>-1 && pgn>-1 && tipo<50) url+= `?per_page=${id2}&page=${pgn}`;
    if(id2>-1 && pgn>-1 && tipo>49) url+= `&per_page=${id2}&page=${pgn}`;
    // if() url+=`&orderBy=${variable,}`
=======

      //Peticiones básicas
      case 0: url += "expediente";  break; //Sin id muestra todos los items,
      case 1: url += "actividad";   break; //con id, todas las peticiones crud de ese tipo
      case 2: url += "tarea";       break;
      case 3: url += "contrato";    break;
      case 4: url += "rol";         break;
      case 5: url += "user";        break;
      case 6: url += "espacio";     break;
      case 7: url += "proveedor";   break;
      case 8: url += "cartera";     break;
      case 9: url += "misTareas";   break; //Todas las tareas de un usuario

      //Peticiones compuestas
      case 100: url += `expediente/${id}/?imagen`;        break; //Insertar imagen en expediente
      case 101: url += `DeExpediente/${id}/actividades`;  break; //Todas las actividades de un expediente
      case 102: url += `DeExpediente/${id}/tareas`;       break; //Todas las tareas de un expediente
      case 103: url += `DeExpediente/${id}/contratos`;    break; //Todas los contratos de un expediente
      case 104: url += `rols/${id}/permisos`;             break; //Todos los permisos de un id rol
      case 105: url += `rol/${id}/permiso/${id2}`;        break; //Insertar o eliminar a un id rol un permiso id2, utiliza put (actualizar)
      case 106: url += `DeCartera/${id}/expedientes`;     break; //Insertar o eliminar a un id rol un permiso id2, utiliza put (actualizar)

      //Peticiones busqueda
      case 200: url += `BusquedaContrato/${busqueda}`;    break;
      case 201: url += `BusquedaEspacio/${busqueda}`;     break;
      case 202: url += `BusquedaExpediente/${busqueda}`;  break;
      case 203: url += `BusquedaActividad/${busqueda}`;   break;
      case 204: url += `BusquedaProveedor/${busqueda}`;   break;
      case 205: url += `BusquedaUsuario/${busqueda}`;     break;
      case 206: url += `BusquedaRol/${busqueda}`;         break;
      case 207: url += `BusquedaCartera/${busqueda}`;     break; //Busca en todas las carteras, da igual su estado

      //Peticiones con filtros
      case 300: url += "cartera?estado=2";                              break; //Cartera aprobada: no se puede añadir expediente ni eliminar
      case 301: url += "cartera?estado=1";                              break; //Cartera sin aprobar: se puede añadir expediente y eliminar
      case 302: url += "cartera?estado=3";                              break; //Cartera terminada: no se puede añadir expediente ni eliminar ni editar
      case 303: url += `BusquedaCartera/${busqueda}?estado=2`;          break; //Busqueda en carteras aprobadas
      case 304: url += `BusquedaCartera/${busqueda}?estado=1`;          break; //Busqueda en carteras no aprobadas
      case 305: url += `BusquedaCartera/${busqueda}?estado=3`;          break; //Busqueda en carteras finalizadas
      case 306: url += `expediente?cartera=${id}`;                      break; //Todos los expedientes de una cartera en particular
      case 307: url += `BusquedaExpediente/${busqueda}?cartera=${id}`;  break; //Busqueda de expedientes de una cartera en particular

      default: console.log("No se ha especificado correctamente una URL.");
    }

    if(id>-1 && tipo <100) url+=`/${id}`;                                             //Si es una peticion CRUD sobre un item en particular
    if(item_pgn>-1 && pgn>-1 && tipo<300) url+= `?per_page=${item_pgn}&page=${pgn}`;  //Si es una peticion get con paginacion
    if(item_pgn>-1 && pgn>-1 && tipo>299) url+= `&per_page=${item_pgn}&page=${pgn}`;                           //Resultado de peticiones get paginados con filtros
    // if() url+=`&orderBy=${variable,}`;                   //Ordenar select

>>>>>>> 0528d55e3f96c387becd011a3dca3ed72f26e5d1
    return url;
  }

  crearItem (tipo,_body){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,-1,-1,-1,-1,"","");
      let body = JSON.stringify( _body );
      let headers = this.header;
      this.http.post(url, body, { headers })
        .toPromise()
          .then(  (res) => { resolve( res.json().data ); },
                  (err) => { resolve( err.toString() )}
          )
          // .catch((err) => { console.log(err.toString()); console.error(err); })
    });
    return promise;
  }

  getItem (tipo:number,id:number,id2:number,i_pgn:number,pgn:number,busqueda:string,orderBy:string){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id,id2,i_pgn,pgn,busqueda,orderBy);
      let headers = this.header;
      console.log(url);
      this.http.get(url, { headers })
        .toPromise()
          .then(  (res) => { resolve( res.json() ); console.log(res.json()) },
                  (err) => { resolve( err.toString() ); console.log(err) }
          )
          // .catch((err) => { console.log(err.toString()); console.error(err); })
    });
    return promise;
  }

  paginacionItems (url){
    let promise = new Promise((resolve, reject) => {
      let headers = this.header;
      console.log(url);
      this.http.get(url, { headers })
        .toPromise()
          .then(  (res) => { resolve( res.json() ); },
                  (err) => { resolve( err.toString() )}
          )
          // .catch((err) => { console.log(err.toString()); console.error(err); })
    });
    return promise;
  }

  actualizarItem (tipo,id, _body, id2){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id,id2,-1,-1,"","");
      let body = JSON.stringify( _body );
      let headers = this.header;
      this.http.put(url, body, { headers })
        .toPromise()
          .then(  (res) => { resolve( res.json().data ); },
                  (err) => { resolve( err.toString() )}
          )
          // .catch((err) => { console.log(err.toString()); console.error(err); })
    });
    return promise;
  }

  eliminarItem (tipo,id,id2){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id,id2,-1,-1,"","");
      let headers = this.header;
      this.http.delete(url, { headers })
        .toPromise()
          .then(  (res) => { resolve( res.json().data ); },
                  (err) => { resolve( err.toString() )}
          )
          // .catch((err) => { console.log(err.toString()); console.error(err); })
    });
    return promise;
  }

  subirFile (tipo, id, file: File){
    let promise = new Promise((resolve, reject) => {
      let url = this.crearURL(tipo,id,-1,-1,-1,"","");
      let formData: FormData = new FormData();
      formData.append('image', file);
      formData.append('_method','put');

      let headers = new Headers ({
        'Access-Control-Allow-Origin':'https://gvent.ovh/Prueba2_1/public',
        'Authorization': this.First_accessToken+this.Secound_accessToken,
      });
      this.http.post(url, formData, { headers })
        .toPromise()
          .then( res => { resolve( res.json().data ); })
          .catch((err) => {
            //TODO ARREGLAR ESTO, es una chapuza
            alert("Modificado correctamente.");
            console.log(err.toString()); console.error(err); })
    });
    return promise;
  }

}
