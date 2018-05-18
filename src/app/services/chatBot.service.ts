import { Injectable }       from '@angular/core';
import { Http, Headers }    from "@angular/http";
import { BehaviorSubject }  from 'rxjs/Rx';

@Injectable()
export class ChatBotService {

  //TOKEN
  token_parte_uno:string="Bearer ";

  url_parte_uno:string = "https://api.api.ai/v1/";
  url_parte_dos:string = "query?v=20150910";

  tokenMarta:string = "d50d49e348fd451cafc74f44b7fefb34";
  tokenDavid:string = "8de87af994234c70935aa50fac881dd3";

  NombMarta:string = "Marta";
  NombDavid:string = "David";

  imgMarta:string = '..\\..\\assets\\ImgChatbots\\marta.JPG';
  imgDavid:string = '..\\..\\assets\\ImgChatbots\\david.JPG';

  smsMarta:string = "¡Hola! Mi nombre es Marta y soy tu asesora personal de GVENT, "+
                    "la aplicación que te permitirá gestionar y administrar tu empresa de eventos con facilidad. "+
                    "Pregúntame cualquier duda que tengas sobre nuestra aplicación o nuestros servicios ofrecidos "+
                    "y yo intentaré resolverla.";
  smsDavid:string = "¡Buenas! Yo soy David y puedo explicarte cualquier duda que tengas sobre el funcionamiento "+
                    "de GVENT.";

  Chatbot = new BehaviorSubject<string[]>(this.logueadoChatbot());

  constructor( private http:Http ) { }

  enviarMensaje(text){
    let promise = new Promise((resolve, reject) => {

      let url = this.url_parte_uno + this.url_parte_dos;
      let params = JSON.stringify({ query: text, lang: "sp", sessionId: "somerandomthing" });
      let headers = new Headers ({
        'Authorization': this.token_parte_uno+this.Chatbot.getValue()[0],
        'Content-Type':'application/json; charset=utf-8',
      });

      this.http.post(url, params, { headers }).toPromise()
        .then(  (res) => { resolve( res.json().result.fulfillment.speech ); },
                (err) => { resolve( err.toString() )}
        )
    });
    return promise;
  }

  private logueadoChatbot(){
    if(!!localStorage.getItem('accesToken') && !!localStorage.getItem('user')){
      return [this.tokenDavid,this.NombDavid,this.imgDavid,this.smsDavid];
    }
    else return [this.tokenMarta,this.NombMarta,this.imgMarta,this.smsMarta];
  }

  reiniciar(){
    this.Chatbot = new BehaviorSubject<string[]>(this.logueadoChatbot());
  }
}
