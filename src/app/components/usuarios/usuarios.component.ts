import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';


import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, UsuariosService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuarios:any[] = [];
  loading:boolean = true;
  // k:number;
  constructor(private _usuariosService:UsuariosService,
              private router:Router,
              private route:ActivatedRoute
            ) {
        this._usuariosService.getUsuarios()
          .subscribe( data =>{
            console.log(data);//la data del getHeroes
            this.usuarios= data.data;
            this.loading=false;
            // this.k=this.usuarios[0].identificador;
            // console.log(k)
            // para retrasar esto
            // //this.loading=false;
            // setTimeout(()=> {
            //   this.loading = false;
            //   this.heroes= data
            // }, 3000);


            // for(let key$ in data){
            //   console.log( data[key$]);//separo la data
            //   this.heroes.push(data[key$]);
            // }
          })
  }
  ngOnInit() {
  }

  ngOnChange(){
    this._usuariosService.getUsuarios();

    this.refresh();
  }

  refresh(){
  this.router.navigate(['usuariosReloaded']);
  }
  borrarUsuario(id:string){
      this._usuariosService.borrarUsuario(id)
          .subscribe(respuesta=>{
            if(respuesta){
              console.log(respuesta);
            }else{
              //todo bien
              delete this.usuarios[id];

            this._usuariosService.getUsuarios();
            this.refresh();


            }

          })

    }
}
