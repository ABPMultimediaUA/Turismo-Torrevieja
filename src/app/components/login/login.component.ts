import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon


import {NavbarComponent} from "../shared/navbar/navbar.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AuthenticationService, TokenService } from '../../services/index';
// import { AlertComponent } from '../../_directives/index';
// import { AuthGuard } from '../../_guards/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private token:TokenService,
        private navbar:NavbarComponent) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.navbar.logueado=false;
        console.log("logueado en el login: "+this.navbar.logueado);
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        console.log("antes de this.authen");
        this.authenticationService.login(this.model)
            .subscribe(
                data => {

                  this.token.getToken(this.model).subscribe(
                  data => {
                    let resultado: any = {};
                    resultado=data;
                    console.log("token resultado= "+resultado.access_token);
                    localStorage.setItem("accesToken", resultado.access_token );
                    console.log("token localStorage= "+localStorage.accesToken);

                    //console.log(resultado);
                    /*
                    localStorage.setItem('token', data.access_toke);
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var token = currentUser.token; // your token
                    */
                  }
                );


                  console.log("Entrar data1");
                  localStorage.setItem("loggedIn", "true");

                  console.log(localStorage.loggedIn);
                  this.navbar.logueado=true;
                  console.log("navbar.logueado: "+this.navbar.logueado);

                  //codigo isrem
                  // localStorage.setItem('currentUser', JSON.stringify({ token: token, name: name }));
                  this.router.navigate(['home']);
                  console.log("Entrar data2");

                    //this.router.navigate([this.returnUrl]);
                },
                error => {
                  console.log("Entrar error");
                  console.log(error);
                    // this.alertService.error("Usuario o contraseña Incorrectos");
                    this.loading = false;
                });
    }
    // logout() {
    //     // remove user from local storage to log user out
    //     localStorage.removeItem('currentUser');
    // }
}
