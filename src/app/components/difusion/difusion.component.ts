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
//
//    Base64 = {
// // private property
// _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
//
// // public method for encoding
// encode : function (input2:string) {
//     var output = "";
//     var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
//     var i = 0;
//
//     var input = this.Base64._utf8_encode(input2);
//
//     while (i < input.length) {
//
//         chr1 = input.charCodeAt(i++);
//         chr2 = input.charCodeAt(i++);
//         chr3 = input.charCodeAt(i++);
//
//         enc1 = chr1 >> 2;
//         enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
//         enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
//         enc4 = chr3 & 63;
//
//         if (isNaN(chr2)) {
//             enc3 = enc4 = 64;
//         } else if (isNaN(chr3)) {
//             enc4 = 64;
//         }
//
//         output = output +
//         this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
//         this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
//
//     }
//
//     return output;
// },
//
// // public method for decoding
// decode : function (input) {
//     var output = "";
//     var chr1, chr2, chr3;
//     var enc1, enc2, enc3, enc4;
//     var i = 0;
//
//     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
//
//     while (i < input.length) {
//
//         enc1 = this._keyStr.indexOf(input.charAt(i++));
//         enc2 = this._keyStr.indexOf(input.charAt(i++));
//         enc3 = this._keyStr.indexOf(input.charAt(i++));
//         enc4 = this._keyStr.indexOf(input.charAt(i++));
//
//         chr1 = (enc1 << 2) | (enc2 >> 4);
//         chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
//         chr3 = ((enc3 & 3) << 6) | enc4;
//
//         output = output + String.fromCharCode(chr1);
//
//         if (enc3 != 64) {
//             output = output + String.fromCharCode(chr2);
//         }
//         if (enc4 != 64) {
//             output = output + String.fromCharCode(chr3);
//         }
//
//     }
//
//     output = this.Base64._utf8_decode(output);
//
//     return output;
//
// },
//
// // private method for UTF-8 encoding
// _utf8_encode : function (string) {
//     string = string.replace(/\r\n/g,"\n");
//     var utftext = "";
//
//     for (var n = 0; n < string.length; n++) {
//
//         var c = string.charCodeAt(n);
//
//         if (c < 128) {
//             utftext += String.fromCharCode(c);
//         }
//         else if((c > 127) && (c < 2048)) {
//             utftext += String.fromCharCode((c >> 6) | 192);
//             utftext += String.fromCharCode((c & 63) | 128);
//         }
//         else {
//             utftext += String.fromCharCode((c >> 12) | 224);
//             utftext += String.fromCharCode(((c >> 6) & 63) | 128);
//             utftext += String.fromCharCode((c & 63) | 128);
//         }
//
//     }
//
//     return utftext;
// },
//
// // private method for UTF-8 decoding
// _utf8_decode : function (utftext) {
//     var string = "";
//     var i = 0;
//     var c = 0;
//     var c2 = 0;
//     var c3 = 0;
//
//     while ( i < utftext.length ) {
//
//         c = utftext.charCodeAt(i);
//
//         if (c < 128) {
//             string += String.fromCharCode(c);
//             i++;
//         }
//         else if((c > 191) && (c < 224)) {
//             c2 = utftext.charCodeAt(i+1);
//             string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
//             i += 2;
//         }
//         else {
//             c2 = utftext.charCodeAt(i+1);
//             c3 = utftext.charCodeAt(i+2);
//             string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
//             i += 3;
//         }
//
//     }
//
//     return string;
// }
//
// }

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

  host:any = 'https://gvent.ovh/turismo-torrevieja/?rest_route=/wp/v2/posts/';
  data:any[] = [];

  header = new Headers ({
    'Content-Type':'application/json',
    //'Content-Length':222222,
  //  'Authorization':'Basic ' + btoa('wpTorrevieja:ar@&78Gl7)^EIR3jk*LHqtuU'),
  //  'Authorization': 'Basic ' + this.Base64.encode('wpTorrevieja:ar@&78Gl7)^EIR3jk*LHqtuU')
    'Authorization': 'Basic d3BUb3JyZXZpZWphOmFyQCY3OEdsNyleRUlSM2prKkxIcXR1VQ==',
    'X-RequestDigest':'requestDigest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'ET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type'

  });


//habilitar esta ruta para probar si carga el evento y tomar los datos, luego enviar a la de turismo torrevieja
 //https://gvent.ovh/Prueba2_1/public/expediente/1

//https://gvent.ovh/turismo-torrevieja/wp-json/wp/v2/posts
//https://gvent.ovh/turismo-torrevieja/index.php/wp-json/wp/v2/posts



//https://gvent.ovh/turismo-torrevieja/?rest_route=/wp/v2/posts/1

//RUTA BUENA

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
                              this.expediente = r.data as ExpedienteInterface;

                            //  this.data[0]=this.expediente.titulo;
                            //  this.data[1]=this.expediente.detalle;

                            }
                            //cargamos imagen
                            if(this.expediente.image){
                              this.expediente.image = "https://gvent.ovh/Prueba2_1/public/img/" + this.expediente.image;
                              let o = this.etiqueta.nativeElement as HTMLImageElement;
                              o.src = this.expediente.image;
                            }
                            this.coordinador = +this.expediente.coordinador;

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

    //let body = JSON.stringify( this.expediente );
      let headers = this.header;
      let bodyAux={
        titulo:this.expediente.titulo,
        detalle:this.expediente.detalle
      }

      this.http.post(url, bodyAux, { headers })
        .toPromise()
          .then(  (res) => { resolve( res.json().data ); },
                  (err) => { resolve( err.toString() )}
          )
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
