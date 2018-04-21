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

  page_access_token: string = "EAACEdEose0cBAGHh1E9wqoHBZA2779DL7d1OJl28uxEPs15GZCixO0H0FkjZBz8ZCfn8fQ1055ZAZAm7b5KNHmoCRvs92ygAWcRj5wfZCzLPiFrv9oD7abDCj9IimgZB62Yr6Uwqf9Cid7CVp1q3rqZBj4dnUwBy1h9QH2F64dEqaW6n6ZCYs7uy8dTk7Hs5vDuF4ZD";

  imagen: File;
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

  // subirPost() {
  //   let xhr = new XMLHttpRequest(),
  //     url = this.URL + this.page_id + '/feed?message=' + this.post.message + '&access_token=' + this.page_access_token;
  //   xhr.open('POST', url, true);
  //   xhr.onload = function() {
  //     console.log(xhr.responseText);
  //     let res = JSON.parse(xhr.responseText);
  //     if (res.id) {
  //       let post_id = res.id;
  //       console.log(post_id);
  //
  //
  //     }
  //
  //   };
  //   xhr.send();
  //   // goTo("index");
  //   return false;
  // }

  mostrarFoto($event): void {
    console.log($event);
    this.readThis($event.target);
  }
  readThis(inputValue: any): void {
    let foto = document.getElementById("foto");
    let inp = foto.childNodes[4];
    let img = document.getElementById("img");

    var file: File = inputValue.files[0];
    this.imagen = file;
    var myReader: FileReader = new FileReader();

    myReader.onloadend = function(e) {
      // you can perform an action with readed data here
      img.setAttribute('src', myReader.result);
      img.setAttribute('alt', file.name);
    }
    myReader.readAsDataURL(file);
  }

  subirPost() {
    let xhr = new XMLHttpRequest();
    let fd = new FormData();
    let url2 = this.URL + this.page_id + '/photos';
    xhr.open('POST', url2, true);
    // xhr.setRequestHeader('access_token', this.page_access_token);
    fd.append("foto", this.imagen);
    fd.append("access_token", this.page_access_token);
    fd.append("caption",  this.post.message);

    xhr.onload = function() {
      console.log(xhr.responseText);
      let res = JSON.parse(xhr.responseText);


    }
    xhr.send(fd);
  }


}
