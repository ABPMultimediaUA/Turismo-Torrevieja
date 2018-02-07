import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';


import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AlertService, AuthenticationService, UsuariosService, LogueadoService } from '../../services/index';
import { EspaciosService } from '../../services/espacios.service';


@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html'
})
export class EspaciosComponent implements OnInit {

  espacios:any[] = [];
  loading:boolean = true;
  //pagination
  paginacion:any = [];
  cantidadPagina:any[]=[];

  espaciosActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;

  constructor(private _espaciosService:EspaciosService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService
            ) {
              this.logueadoService.comprobarLogueado();

              console.log("estaLogueado:");
              console.log(this.logueadoService.estaLogueado);
        this._espaciosService.getEspacios("1")
          .subscribe( data =>{
            console.log(data);//la data del getHeroes

            this.espacios= data.data;

            this.totalPaginas = Math.ceil(this.espacios.length/10);

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

            if(this.espacios.length>9){
              for(let i=0;i<=9;i++)
              {
                this.espaciosActuales.push(this.espacios[i]);
              }
            }else{
              for(let i=0;i<=this.espacios.length;i++)
              {
                this.espaciosActuales.push(this.espacios[i]);
              }
            }



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
    this.espaciosActuales=[];

    if(pagina==this.totalPaginas){
      for(let i=x;i<this.espacios.length;i++)
      {
        this.espaciosActuales.push(this.espacios[i]);
      }
    }else{
      for(let i=x;i<=y;i++)
      {
        this.espaciosActuales.push(this.espacios[i]);
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

  borrarEspacio(id:string){
      this._espaciosService.borrarEspacio(id)
          .subscribe(respuesta=>{
            if(respuesta){
              console.log("caracola");
              console.log(respuesta);
              console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
            this._espaciosService.getEspacios("1");
            console.log( "aqui los ha pedido ya todos de nuevo y voy a hacer el router navigate a usuarios" );
            location.reload(true);
            this.router.navigate(['espacios']);
            // this.refresh();
            }else{
              //todo bien
              delete this.espacios[id];
            //   console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
            // this._usuariosService.getUsuarios();
            // console.log( "aqui los ha pedido ya todos de nuevo" );
            // this.refresh();


            }

          })

    }

}
