import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpedienteInterface }  from "../../interfaces/expediente.interface";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService ,PeticionesCrudService } from '../../services/index';
import { Http, Headers } from "@angular/http";

@Component({
  selector: 'app-difusion',
  templateUrl: './difusion.component.html',
  styleUrls: ['./difusion.component.css']
})
export class DifusionComponent implements OnInit {



coordinador:number;
id:string;

@ViewChild("etiquetaImgExp") etiqueta;

  public expediente:ExpedienteInterface={
    identificador:0,
    avance:0,
    cartera:0,
    coordinador:0,
    detalle:"",
    fechaFin:null,
    fechaInicio:null,
    image:"",
    nombreExpediente:"",
    titulo:"",
  };

  public expediente2:ExpedienteInterface={
    identificador:0,
    avance:0,
    cartera:0,
    coordinador:0,
    detalle:"",
    fechaFin:null,
    fechaInicio:null,
    image:"",
    nombreExpediente:"",
    titulo:"",
  };


  //host:any = 'https://gvent.ovh/turismo-torrevieja/?rest_route=/wp/v2/posts';
  host:any = 'http://127.0.0.1:8080/x3/?rest_route=/wp/v2/posts';
  data:any[] = [];

  header = new Headers ({
    'Content-Type':'application/json',
  //  'Authorization': 'Basic d3BUb3JyZXZpZWphOmFyQCY3OEdsNyleRUlSM2prKkxIcXR1VQ==',
    'Authorization': 'Basic amF2aXgzOkVheHlXSChIWERsJnJ0WG03T0tRZFRNNA==',
    // 'X-RequestDigest':'requestDigest',
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'ET, POST, PATCH, PUT, DELETE, OPTIONS',
     'Access-Control-Allow-Credentials':'true',
  //   'Access-Control-Allow-Headers': 'Authorization, Content-Type,accept, origin, X-Requested-With, X-Authentication',
     'Access-Control-Allow-Headers': '*',
     'Access-Control-Expose-Headers': 'X-WP-Total, X-WP-TotalPages',
  //   'Access-Control-Max-Age': '1728000'

  });


//https://gvent.ovh/turismo-torrevieja/?rest_route=/wp/v2/posts/1

  constructor(private http:Http,
                private _ItemService: PeticionesCrudService,
                private router:Router,
                private route:ActivatedRoute,){

                  this.route.params.subscribe(parametros=>{
                        this.id = parametros['id'];
                        //COGEMOS EL EXPEDIENTE
                        this._ItemService.getItem(0,this.id,-1,-1).then(res => {
                            if(typeof res != "string"){
                              let r = res as any;
                              this.expediente2 = r.data as ExpedienteInterface;

                            //  this.data[0]=this.expediente.titulo;
                            //  this.data[1]=this.expediente.detalle;

                            }
                            //cargamos imagen
                            if(this.expediente2.image){
                              this.expediente2.image = "https://gvent.ovh/Prueba2_1/public/img/" + this.expediente2.image;
                              let o = this.etiqueta.nativeElement as HTMLImageElement;
                              o.src = this.expediente2.image;
                            }
                            this.coordinador = +this.expediente2.coordinador;

                            this.expediente=this.expediente2;

                          });
                console.log("WOEWOEWOWE");
                console.log(this.expediente);
                console.log("WOEWOEWOWE");
                console.log(btoa('wpTorrevieja:ar@&78Gl7)^EIR3jk*LHqtuU'));
                console.log("SEGUNDA ENCRIPTACION");
                console.log(btoa('wpTorrevieja:ar@&78Gl7)^EIR3jk*LHqtuU'));
              });
            }


  ngOnInit() {
  }

  enviarPostWP(){
    let promise = new Promise((resolve, reject) => {
      let url = this.host;
      console.log("1");
    //let body = JSON.stringify( this.expediente );
      let headers = this.header;
      let bodyAux={
        title:this.expediente.titulo,
        content:this.expediente.detalle
      }
      console.log("2 "+headers);

      this.http.post(url, bodyAux , { headers: headers })
        .toPromise()
          .then(  (res) => { resolve( res.json().data ); },
                  (err) => { resolve( err.toString() )}
          )
      console.log("3");
          // .catch((err) => { console.log(err.toString()); console.error(err); })
    });
    return promise;






























//     let args = [
//     (method) => 'Post',
//     (timeout) => 20,
//     (headers) => this.header
// ];  //PRUEBAAA
//
//     let promise = new Promise((resolve, reject) => {
//       let url = this.host;
//       let body = this.data;
//   //    let body = JSON.stringify( _body );
//       let headers = this.header;
//
//       this.http.post(url, body, { headers })
//         .toPromise()
//           .then(  (res) => { resolve( res.json().data ); },
//                   (err) => { resolve( err.toString() )}
//           )
//           // .catch((err) => { console.log(err.toString()); console.error(err); })
//     });
//     return promise;
//
//
//     <?php
// $host = 'http://tudominio.com/wp-json/wp/v2/posts/';
// $data = array('title' => 'Titulo Post Nuevo', 'content' => 'Contenido nueva entrada', 'status' => 'publish');
// $data_string = json_encode($data);
// $headers = array(
//     'Content-Type:application/json',
//     'Content-Length: ' . strlen($data_string),
//     'Authorization: Basic '. base64_encode('admin:clave')
// );
// $ch = curl_init($host);
// curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
// curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
// curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
// curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
// $result = curl_exec($ch);
// curl_close($ch);
// echo($result);
  }

  // subirPost() {
  //
  //       let xhr = new XMLHttpRequest();
  //       let fd = new FormData();
  //       let url2 = this.host;
  //       xhr.open('POST', url2, true);
  //       fd.append("access_token", this.page_access_token);
  //       fd.append("caption", this.post.message);
  //
  //       xhr.onload = function() {
  //         console.log(xhr.responseText);
  //         let res = JSON.parse(xhr.responseText);
  //
  //
  //       }
  //       xhr.send(fd);
  //   }




}
