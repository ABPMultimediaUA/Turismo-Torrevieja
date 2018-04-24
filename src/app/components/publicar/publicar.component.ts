import { Component, OnInit, Input, OnChanges, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { PostFacebook } from "../../interfaces/postFacebook.interface";
import { Http, Headers } from "@angular/http";

import { PaginasInterface }                     from '../../interfaces/paginas.interface';


@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent implements OnInit {
  URL = "https://graph.facebook.com/";

  paginas:PaginasInterface[]=[];

  page_name: string = "Cultura Torrevieja";
  page_id: string = "497922363906912";

  user_access_token: string = "EAACEdEose0cBAKgDoZA0TA2qSqNI0kwbkzwIcbZArEi2SELwa2N0rMlRoSwVZCMPCDjKCEFhq9rqIfdVSxVjc0MymSyfKFF9jYZBNbmRKDn0bsBaknZCpb19DeGPEfAxwNCcn8GQ2FqRRXkf7ZAcFPsZA0ms8owJBS3DXXZBWTMkFqQfIZAFHWQUyVY3Bm18Vj0I49pFZC85NsZCgZDZD";
  page_access_token: string = "";

  imagen: File;
  public post: PostFacebook = {
    message: ""
  };

  constructor(private http: Http) {
    //hay que conseguir el page acces token que va cambiando
    //para ello necesito hacer la peticion con el access token de un usuario que
    //puede manejar la pagina
    let urlPage = this.URL + this.page_id + '?fields=access_token' + '&access_token=' + this.user_access_token;
    this.http.get(urlPage).toPromise().then((res) => {
      let body = JSON.parse(res._body);
      this.page_access_token=body.access_token;
    });

    // //Estaria mejor si lo que recibo son todas las paginas que maneja ese usuario y
    // //que el elija en cual Publicar
    // let urlPagesUser = this.URL+ 'me/accounts' + '?access_token=' + this.user_access_token;
    // this.http.get(urlPagesUser).toPromise().then((res) => {
    //   let body2 = JSON.parse(res._body);
    //   body2.data
    //   console.log(body2);
    // });


    // let xhr: any = new XMLHttpRequest();
    // // // let urlPage = this.URL + this.page_id +'?access_token='+this.user_access_token;
    // xhr.open('GET', urlPage, true);
    // // xhr.setRequestHeader('access_token', this.user_access_token);
    // xhr.onload = function() {
    //   console.log(xhr.responseText);
    //   let res = JSON.parse(xhr.responseText);
    //   this.page_access_token = res.access_token;
    //   console.log(this.page_access_token);
    // }
    // xhr.send()

    // .map(resp => resp.json()).then(
    //   res => { console.log(res)  });



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
    fd.append("foto", this.imagen);
    // fd.append("access_token", this.user_access_token);
    console.log(this.page_access_token);
    fd.append("access_token", this.page_access_token);
    fd.append("caption", this.post.message);

    xhr.onload = function() {
      console.log(xhr.responseText);
      let res = JSON.parse(xhr.responseText);


    }
    xhr.send(fd);
  }


}
