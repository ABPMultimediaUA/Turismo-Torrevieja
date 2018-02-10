import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';

import { Cartera }  from "../../interfaces/cartera.interface";
import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, CarterasService, LogueadoService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';

@Component({
  selector: 'app-carteras',
  templateUrl: './carteras.component.html'
})
export class CarterasComponent implements OnInit {
  carteras:any[] = [];
  loading:boolean = true;
  //pagination
  paginacion:any = [];
  cantidadPagina:any[]=[];
  carterasPorPagina:number=10;
  ItemsPorPagina:string;
  carterasActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;
  // k:number;
  constructor(private _carterasService:CarterasService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService
            ) {
              this.logueadoService.comprobarLogueado();

              console.log("estaLogueado:");
              console.log(this.logueadoService.estaLogueado);
        this._carterasService.getCarteras("1")
          .subscribe( data =>{
            console.log(data);//la data del getHeroes

            this.carteras= data.data;
            console.log("array de carteras:");
            console.log(this.carteras);
            console.log("carteras[3]:");
            console.log(this.carteras[3]);

            this.ItemsPorPagina = localStorage.getItem("ItemsPorPagina");
            console.log("cojo Items por pagina de localstorage:",this.ItemsPorPagina );
            this.carterasPorPagina = parseInt(this.ItemsPorPagina);
            console.log("paso itemspor pagina a number y lo meto en carteras por pagina:",this.carterasPorPagina);
            this.totalPaginas = Math.ceil(this.carteras.length/this.carterasPorPagina);
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

            if(this.carteras.length>(this.carterasPorPagina-1)){
              for(let i=0;i<=(this.carterasPorPagina-1);i++)
              {
                this.carterasActuales.push(this.carteras[i]);
              }
            }else{
              for(let i=0;i<=this.carteras.length;i++)
              {
                this.carterasActuales.push(this.carteras[i]);
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
  cambiarNumCarterasPorPagina(){
    this.carterasPorPagina=this.carterasPorPagina;
    console.log("nuevo numero de carteras por pagina: ", this.carterasPorPagina);
    var n = this.carterasPorPagina.toString();
    localStorage.setItem("ItemsPorPagina", n);

     location.reload(true);
  }
  nuevaPagina(pagina:number){
    this.currentPage=pagina;
    console.log("pagina que pido:");
    console.log(pagina);
    let x = this.carterasPorPagina * (pagina-1);
    let y = x + (this.carterasPorPagina-1);
    this.carterasActuales=[];

    if(pagina==this.totalPaginas){
      for(let i=x;i<this.carteras.length;i++)
      {
        this.carterasActuales.push(this.carteras[i]);
      }
    }else{
      for(let i=x;i<=y;i++)
      {
        this.carterasActuales.push(this.carteras[i]);
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
  borrarCartera(id:string){
      this._carterasService.borrarCartera(id)
          .subscribe(respuesta=>{
            if(respuesta){
              console.log("caracola");
              console.log(respuesta);
              console.log( "borracartera y ahora va a pedir todos los carteras de nuevo" );
            this._carterasService.getCarteras("1");
            console.log( "aqui los ha pedido ya todos de nuevo y voy a hacer el router navigate a carteras" );
            location.reload(true);
            this.router.navigate(['carteras']);
            // this.refresh();
            }else{
              //todo bien
              delete this.carteras[id];
            //   console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
            // this._usuariosService.getUsuarios();
            // console.log( "aqui los ha pedido ya todos de nuevo" );
            // this.refresh();


            }

          })

    }
  }
