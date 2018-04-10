import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, TokenService, DatosUsuarioService} from '../../services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  loginError = false;

  logueando:boolean=false;



  constructor( private route: ActivatedRoute,
               private router: Router,
               private authenticationService: AuthenticationService,
               private token:TokenService,
               private datosUsu:DatosUsuarioService,
             )
  {
      this.logueando=false;
  }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
      this.logueando=true;
      console.log(this.logueando);
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
                        // location.reload(true);
                      }
                    );

                    console.log("ddatosusuariooooooooooooooooo:"+ localStorage.datosUsuario);
                    // this.navegador
                  }
                );

                localStorage.setItem("loggedIn", "true");

                console.log("despues de set logueado");


                  this.router.navigate(['perfil']);


                  console.log("estaLogueado:");

                    this.logueando=true;
              },
              error => {
                this.loginError = true;
                  this.loading = false;
              });
  }
  logout() {
      localStorage.removeItem('currentUser');

  }

}
