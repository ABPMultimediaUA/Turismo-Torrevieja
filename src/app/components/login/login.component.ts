import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import {HomeComponent} from "../home/home.component";
import {NavbarComponent} from "../shared/navbar/navbar.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AuthenticationService, TokenService, LogueadoService} from '../../services/index';
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
    loginError = false;




    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private token:TokenService,
        private navbar:NavbarComponent,
        private home:HomeComponent,
        private logueadoService: LogueadoService
      ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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

            console.log("entra aqui");
              localStorage.setItem("accesToken", resultado.access_token );
                  this.logueadoService.logueando();
            location.reload(true);
                    //console.log(document.getElementById("verUsuarios").style);
                    //console.log("token resultado= "+resultado.access_token);

                    //console.log("token localStorage= "+localStorage.accesToken);

                    //console.log(resultado);
                    /*
                    localStorage.setItem('token', data.access_toke);
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    var token = currentUser.token; // your token
                    */
                  }
                );


                  //console.log("Entrar data1");
                  localStorage.setItem("loggedIn", "true");
                //  localStorage.setItem("accesToken", resultado.access_token );
                  this.navbar.loguear();

                  console.log("despues de set logueado");
                  //console.log(localStorage.loggedIn);
                  //this.navbar.loguea();
                  //console.log("navbar.logueado: "+this.navbar.logueado);
                  //conectarse a la base de datos y guardar en el session storage la info del usuario
                  // con el mail del login




                  localStorage.setItem("Id_usuario", "19");
                  // if(this.logueadoService.estaLogueado==true){
                    this.router.navigate(['usuarios']);
                    this.logueadoService.logueando();
                  //  location.reload(true);

                    console.log("estaLogueado:");
                    console.log(this.logueadoService.estaLogueado);

                  // }else{
                  //   this.router.navigate(['home']);
                  // }



                    //this.router.navigate([this.returnUrl]);
                },
                error => {
                  this.loginError = true;
                    // this.alertService.error("Usuario o contraseña Incorrectos");
                    this.loading = false;
                });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');

    }
}
