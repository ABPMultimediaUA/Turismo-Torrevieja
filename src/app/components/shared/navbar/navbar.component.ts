import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../../login/login.component';



import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService } from '../../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

    logueado= false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
        ) { }

  ngOnInit() {



  }
  logoin(){

    console.log("logueado cuando voy al login: "+this.logueado)
    this.router.navigate(['login']);
  }


  logout(){
    // console.log(localStorage.loggedIn);
    // localStorage.loggedIn=false;
    // console.log(localStorage.loggedIn);

    delete localStorage.accesToken;
    //localStorage.removeItem(accessToken);
    this.logueado=false;
    console.log("logueado: "+this.logueado);

    this.router.navigate(['home']);
  }


  // logeado(){
  //   if (localStorage.loggedIn==true){
  //     this.logueado=true;
  //   }else{
  //     this.logueado=false;
  //
  //   }
  // }

}
