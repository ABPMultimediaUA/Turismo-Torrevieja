import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
//ramon
import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  loginURL:string="https://gvent.ovh/Prueba2_1/public/login";
  logueado:boolean = false;

    constructor(private http: HttpClient,
                private router: Router
                ) {
                      if(localStorage.loggedIn){
                          this.logueado=localStorage.loggedIn;
                      }
                      console.log(this.logueado);

                }

    login(model) {
      console.log("Body "+model);

      return this.http.post(this.loginURL, model,
        {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                responseType: 'text'
             }

      ).map(user =>
      {

        console.log("loguear correctamente");
        this.logueado = true ;
        console.log(this.logueado);
        // login successful if there's a jwt token in the response
        /*
        if (user && user.token)
        {

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
        */
        //console.log(user);
        return user;
    });
    }


    logout() {
        // remove user from local storage to log user out
        this.logueado = false ;
        console.log(this.logueado);
        localStorage.removeItem('currentUser');
    }
}
