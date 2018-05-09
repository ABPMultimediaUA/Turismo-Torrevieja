import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import {HomeComponent} from "../home/home.component";
import {NavbarComponent} from "../shared/navbar/navbar.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import {AlertService } from '../../services/alert.service';
// import { AlertComponent } from '../../_directives/index';
// import { AuthGuard } from '../../_guards/index';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
parametro:string = "mensaje de prueba";
tipo_mensaje:string;
mensaje:string;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private navbar:NavbarComponent,
      private home:HomeComponent,
    ) {
      console.log("entra en mensajes");
      this.route.params.subscribe(parametros=>{
            console.log(parametros);
            this.parametro = parametros['parame'];
            //mostrar mensajes

            if(this.parametro=="verificado"){
              this.tipo_mensaje="genial";
              this.mensaje= "¡Enhorabuena! Ya estas registrado en Gvent. Inicia sesion para acceder a la aplicación";
            }
            if(this.parametro=="noEncontrado"){
              this.tipo_mensaje="error";
              this.mensaje= "404. Lo que buscabas no existe o no lo hemos encontrado.";
            }


            });
     }

  ngOnInit() {
  }


}
