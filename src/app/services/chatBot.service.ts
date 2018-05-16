import { Injectable }       from '@angular/core';
import { Http, Headers }    from "@angular/http";
import { AuthService }      from './auth.service';

@Injectable()
export class ChatBotService {

  //TOKEN
  token_parte_uno:string="Bearer ";

  url_parte_uno:string = "https://api.api.ai/v1/";
  url_parte_dos:string = "query?v=20150910";

  constructor( private http:Http, private _authService:AuthService ) { }

  enviarMensaje(text){
    let promise = new Promise((resolve, reject) => {

      let url = this.url_parte_uno + this.url_parte_dos;
      let params = JSON.stringify({ query: text, lang: "sp", sessionId: "somerandomthing" });
      let headers = new Headers ({
        'Authorization': this.token_parte_uno+this._authService.Chatbot.getValue()[0],
        'Content-Type':'application/json; charset=utf-8',
      });


      this.http.post(url, params, { headers }).toPromise()
        .then(  (res) => { resolve( res.json().result.fulfillment.speech ); },
                (err) => { resolve( err.toString() )}
        )
    });
    return promise;
  }

}
