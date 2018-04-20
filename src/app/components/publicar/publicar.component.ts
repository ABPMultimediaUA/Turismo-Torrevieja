import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { PostFacebook }  from "../../interfaces/postFacebook.interface";


@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {
  public post:PostFacebook={
    message:""
  };

  constructor() { }

  ngOnInit() {
  }

  subirPost() {

    console.log(this.post.message);

  //   let body = JSON.stringify(expediente);//Cambiar todos los valos de heroe a string
  //   let headers = new Headers({
  //
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': 'https://gvent.ovh/Prueba2_1/public',
  //     'Authorization': this.First_accessToken + this.Secound_accessToken,
  //
  //     //'X-XSRF-TOKEN':this.First_accessToken+this.Secound_accessToken
  //   });
  //   console.log("body. expediente que quiero postear: " + body);
  //   return this.http.post(this.expedientesURL, body, { headers })
  //     .map(res => {
  //       console.log(localStorage.accesToken);
  //       console.log(res.json());
  //       (res: Response) => res.json();
  //     })
   }
  // subirPost(frm) {
  //   let xhr = new XMLHttpRequest();
  //   let url = './rest/receta/';
  //   let fd = new FormData();
  //   xhr.open('POST', url, true);
  //   xhr.setRequestHeader('Authorization', sessionStorage.getItem("clave"));
  //   fd.append("l", sessionStorage.getItem("login"));
  //   fd.append("n", frm.titulo.value);
  //   fd.append("e", frm.elaboracion.value);
  //   fd.append("t", frm.tiempo.value);
  //   fd.append("d", frm.dificultad.value);
  //   fd.append("c", frm.comensales.value);
  //   //si al menos hay una foto en la receta
  //   // var fotos = document.querySelectorAll(".foto");
  //   if (fotos.length < 1) {
  //     crearMensaje("minimo1foto");
  //   } else {
  //     //enviamos los datos basicos de la receta sin ingredientes ni fotos para crear el id
  //     xhr.onload = function() {
  //       console.log(xhr.responseText);
  //       let v = JSON.parse(xhr.responseText);
  //       console.log(v);
  //       if (v.RESULTADO == 'OK') {
  //         console.log("se ha creado el id de la receta" + v.ID);
  //         let idReceta = v.ID;
  //         //ahora recogemos los ingredientes
  //         subirIngredientes(idReceta);
  //         //ahora recogemos las fotos
  //         subirFotos(idReceta);
  //       } else {
  //         descripcionError = v.DESCRIPCION;
  //         crearMensaje("errorNuevaReceta");
  //       }
  //     }
  //     xhr.send(fd);
  //     // return false;
  //   }
  //
  // }
}
