import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class TokenService {
  //Variable de instancia
  tokenURL:string="https://gvent.ovh/Prueba2_1/public/oauth/token";


  constructor(private http: HttpClient) { }

  getToken(model)
  {


    //type MyArrayType = Array<{grant_type: string, client_id: string, client_secret: string, username: string, password: string,}>;
/*
    let newModel = [
        {grant_type : "password"},
        {client_id:"13"},
        {client_secret:"6Po2ezPJZoiOlRvUygawP6uksOe1OXs3ajQ00RK1"},
        {username:model.email},
        {password:model.password},
    ];
*/



    return this.http.post(this.tokenURL, {
                                          "grant_type":"password",
                                          "client_id":"17",
                                          "client_secret":"g8t970BjbeZiTccFLCD3zOkYyhrl7CGEXJEJUmx9",
                                          "username":model.email,
                                          "password":model.password,
                                        }

    );

  }

}
