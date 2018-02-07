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
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['./cartera.component.css']
})
export class CarteraComponent implements OnInit {
  eventos:any[] = [];
  loading:boolean = true;
  //pagination
  paginacion:any = [];
  cantidadPagina:any[]=[];

  eventosActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;
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

            this.eventos= data.data;
            console.log("array de usuarios:");
            console.log(this.eventos);
            console.log("usuarios[3]:");
            console.log(this.eventos[3]);
            this.totalPaginas = Math.ceil(this.eventos.length/10);
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

            if(this.eventos.length>9){
              for(let i=0;i<=9;i++)
              {
                this.eventosActuales.push(this.eventos[i]);
              }
            }else{
              for(let i=0;i<=this.eventos.length;i++)
              {
                this.eventosActuales.push(this.eventos[i]);
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
    this.eventosActuales=[];

    if(pagina==this.totalPaginas){
      for(let i=x;i<this.eventos.length;i++)
      {
        this.eventosActuales.push(this.eventos[i]);
      }
    }else{
      for(let i=x;i<=y;i++)
      {
        this.eventosActuales.push(this.eventos[i]);
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
              delete this.eventos[id];
            //   console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
            // this._usuariosService.getUsuarios();
            // console.log( "aqui los ha pedido ya todos de nuevo" );
            // this.refresh();


            }

          })

    }
}
