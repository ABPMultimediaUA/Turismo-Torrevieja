import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { PostFacebook } from "../../interfaces/postFacebook.interface";


@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {
  URL = "https://graph.facebook.com/";

  page_name: string = "Cultura Torrevieja";
  page_id: string = "497922363906912";

  page_access_token: string = "EAACEdEose0cBAJEeZCcuWlcsrHQZAiwuLNyEdHHwNfOvDEHZBjnj5Fm0srUVKHlHJn0Mukmwnn1Pv1pv0VkhHHYUnzffN1Ux4eGarE7nLT5gZBGZAZAPVZAgYyNZBs7XD5Mw9VuKIj07t5j5d9WbFNJJ8ytiZANsx2o6PPir5Gg11VtkW6jSSDViEPZCbqzfiVTBLK35Wm1SwjVwZDZD";

  public post: PostFacebook = {
    message: ""
  };

  constructor() {
    //hay que conseguir el page acces token que va cambiando
    //para ello necesito hacer la peticion con el access token de un usuario que
    //puede manejar la pagina



  }

  ngOnInit() {
  }
  //https://graph.facebook.com/497922363906912/feed?message=prueba2&access_token=EAACEdEose0cBAJEeZCcuWlcsrHQZAiwuLNyEdHHwNfOvDEHZBjnj5Fm0srUVKHlHJn0Mukmwnn1Pv1pv0VkhHHYUnzffN1Ux4eGarE7nLT5gZBGZAZAPVZAgYyNZBs7XD5Mw9VuKIj07t5j5d9WbFNJJ8ytiZANsx2o6PPir5Gg11VtkW6jSSDViEPZCbqzfiVTBLK35Wm1SwjVwZDZD

  subirPost() {
    let xhr = new XMLHttpRequest(),
      url = this.URL + this.page_id + '/feed?message=' + this.post.message + '&access_token=' + this.page_access_token;
    xhr.open('POST', url, true);
    xhr.onload = function() {
      console.log(xhr.responseText);
      let res = JSON.parse(xhr.responseText);
      if (res.id) {
        let post_id = res.id;
        console.log(post_id);
        //cuando ya tengo la id del post procedo a subir la imagen si hay

      }

    };
    xhr.send();
    // goTo("index");
    return false;
  }
   mostrarFoto(btn) {

    // var newNode = document.createElement("input");
    // newNode.type = "file";
    // newNode.name = "file";
    // newNode.className = "file";
    // newNode.accept = "image/x-png,image/gif,image/jpeg"
    // newNode.setAttribute("onchange", "mostrarFoto(this)");

    let foto = btn.parentNode;
    console.log(foto);
    let inp = btn.parentNode.childNodes[4];
    //si la imagen es mas grande que 300kb no lo carga
    // if (inp.files[0].size > 300000) {
    //   //si la imagen es mas grande se crea el mensaje y ademas se vacia la imagen el texto y el input del archivo
    //   crearMensaje("imgGrande");
    //   inp.remove();
    //   preInput = document.getElementById("preInput");
    //   foto.insertBefore(newNode, preInput);
    //   let img = foto.childNodes[0].childNodes[0];
    //   img.src = "imgs/noimg.jpg";
    //   let text = foto.childNodes[2];
    //   text.value = '';
    // } else {
      let fr = new FileReader();
      fr.onload = function() {
        let img = btn.parentNode.childNodes[0].childNodes[0];
        img.src = fr.result;
        img.alt = inp.files[0].name;
      };
      fr.readAsDataURL(inp.files[0]);
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
