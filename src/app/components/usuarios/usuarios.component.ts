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
import { AlertService, AuthenticationService, UsuariosService, LogueadoService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuarios:any[] = [];
  loading:boolean = true;
  //pagination
  paginacion:any = [];
  cantidadPagina:any[]=[];

  usuariosActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;
  // k:number;
  constructor(private _usuariosService:UsuariosService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService
            ) {
              this.logueadoService.comprobarLogueado();

              console.log("estaLogueado:");
              console.log(this.logueadoService.estaLogueado);
        this._usuariosService.getUsuarios("1")
          .subscribe( data =>{
            console.log(data);//la data del getHeroes

            this.usuarios= data.data;
            console.log("array de usuarios:");
            console.log(this.usuarios);
            console.log("usuarios[3]:");
            console.log(this.usuarios[3]);
            this.totalPaginas = Math.ceil(this.usuarios.length/10);
            console.log("this.totalPaginas:");
            console.log(this.totalPaginas);
            this.loading=false;
          //  this.paginacion = data.meta.pagination;
            //let paginaActual= data.meta.pagination.current_page;

            // console.log("paginaActual");
            // console.log(paginaActual);
            // console.log("totalPaginas");
            // console.log(this.paginacion.total_pages);

            for(let i=0;i<this.totalPaginas;i++)
            {
              this.cantidadPagina.push(i);
            }

            if(this.usuarios.length>9){
              for(let i=0;i<=9;i++)
              {
                this.usuariosActuales.push(this.usuarios[i]);
              }
            }else{
              for(let i=0;i<=this.usuarios.length;i++)
              {
                this.usuariosActuales.push(this.usuarios[i]);
              }
            }



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
  nuevaPagina(pagina:number){
    this.currentPage=pagina;
    console.log("pagina que pido:");
    console.log(pagina);
    let x = 10 * (pagina-1);
    let y = x + 9;
    this.usuariosActuales=[];

    if(pagina==this.totalPaginas){
      for(let i=x;i<this.usuarios.length;i++)
      {
        this.usuariosActuales.push(this.usuarios[i]);
      }
    }else{
      for(let i=x;i<=y;i++)
      {
        this.usuariosActuales.push(this.usuarios[i]);
      }
    }




    // this._usuariosService.getUsuarios(pagina)
    //   .subscribe( data =>{
    //     console.log(data);//la data del getUsuarios
    //
    //     this.usuarios= data.data;
    //     this.loading=false;
    //     this.paginacion = data.meta.pagination;
    //     console.log(this.paginacion.total_pages);
    //
    //     for(let i=0;i<this.paginacion.total_pages;i++)
    //     {
    //       this.cantidadPagina.push(i);
    //     }
    //   })
  }
  // ngOnChange(){
  //   this._usuariosService.getUsuarios();
  //
  //   this.refresh();
  // }

  // refresh(){
  // this.router.navigate(['usuarios']);
  // }
  borrarUsuario(id:string){
      this._usuariosService.borrarUsuario(id)
          .subscribe(respuesta=>{
            if(respuesta){
              console.log("caracola");
              console.log(respuesta);
              console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
            this._usuariosService.getUsuarios("1");
            console.log( "aqui los ha pedido ya todos de nuevo y voy a hacer el router navigate a usuarios" );
            location.reload(true);
            this.router.navigate(['usuarios']);
            // this.refresh();
            }else{
              //todo bien
              delete this.usuarios[id];
            //   console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
            // this._usuariosService.getUsuarios();
            // console.log( "aqui los ha pedido ya todos de nuevo" );
            // this.refresh();


            }

          })

    }
}
