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
import { AuthenticationService, TokenService, LogueadoService, DatosUsuarioService} from '../../services/index';
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

    model2: any = {};




    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private token:TokenService,
        private datosUsu:DatosUsuarioService,
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
                      localStorage.setItem("accesToken", resultado.access_token );

                      this.datosUsu.getDatosUsuario(resultado.access_token).subscribe(
                        data => {
                          let devuelto: any = {};
                          devuelto=data;

                          console.log("devueltoooooooooooooooooooooooo:", devuelto);

                          localStorage.setItem("identificador", devuelto.data.identificador);
                          localStorage.setItem("nombreUsuario", devuelto.data.nombreUsuario);
                          localStorage.setItem("apodo", devuelto.data.apodo);
                          localStorage.setItem("correo", devuelto.data.correo);
                          localStorage.setItem("rol", devuelto.data.rol);
                          localStorage.setItem("esVerificado", devuelto.data.esVerificado);
                          localStorage.setItem("fechaCreacion", devuelto.data.fechaCreacion);

                          console.log("identificadorrrrrrrrrrrrrrrrrrrrrrrrrrrr:");
                          console.log(devuelto.data.identificador);
                          location.reload(true);
                        }
                      );



                      this.logueadoService.logueando();
                      //location.reload(true);
                      console.log("ddatosusuariooooooooooooooooo:"+ localStorage.datosUsuario);
                    }


                  );




                  //console.log("Entrar data1");
                  localStorage.setItem("loggedIn", "true");
                //  localStorage.setItem("accesToken", resultado.access_token );


                  console.log("despues de set logueado");
                  //console.log(localStorage.loggedIn);
                  //this.navbar.loguea();
                  //console.log("navbar.logueado: "+this.navbar.logueado);
                  //conectarse a la base de datos y guardar en el session storage la info del usuario
                  // con el mail del login





                  // if(this.logueadoService.estaLogueado==true){
                    this.router.navigate(['perfil']);

                    // location.reload(true);
                    this.logueadoService.logueando();


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
