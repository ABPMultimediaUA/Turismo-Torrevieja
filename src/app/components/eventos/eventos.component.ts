import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';

import { Evento }  from "../../interfaces/evento.interface";
import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, EventosService, LogueadoService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html'
})
export class EventosComponent implements OnInit {
  eventos:any[] = [];
  resultados:any[] = [];
  loading:boolean = true;
  hasBuscado:boolean = false

  nombreBusqueda:string = "";
  // filterargs = {title: 'hello'};
  // items = [{title: 'hello world'}, {title: 'hello kitty'}, {title: 'foo bar'}];
  filterargs = {nombreEvento: this.nombreBusqueda};
  public resultado:Evento={
    identificador:"",
    nombreEvento:"",
    usuario:"", //usuario que ha creado el evento
    fechaCreacion:"",
    fechaActualizacion:"",
    fechaEliminacion:""
  };
  // nohasBuscado:boolean = true;
  //pagination
  paginacion:any = [];
  cantidadPagina:any[]=[];
  eventosPorPagina:number=10;
  ItemsPorPagina:string;
  eventosActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;



  // k:number;
  constructor(private _eventosService:EventosService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService
            ) {
              this.logueadoService.comprobarLogueado();

              console.log("estaLogueado:");
              console.log(this.logueadoService.estaLogueado);
        this._eventosService.getEventos("1")
          .subscribe( data =>{
            console.log(data);//la data del getHeroes

            this.eventos= data.data;
            console.log("array de eventos:");
            console.log(this.eventos);
            console.log("eventos[3]:");
            console.log(this.eventos[3]);

            this.ItemsPorPagina = localStorage.getItem("ItemsPorPagina");
            console.log("cojo Items por pagina de localstorage:",this.ItemsPorPagina );
            this.eventosPorPagina = parseInt(this.ItemsPorPagina);
            console.log("paso itemspor pagina a number y lo meto en eventos por pagina:",this.eventosPorPagina);
            this.totalPaginas = Math.ceil(this.eventos.length/this.eventosPorPagina);
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

            if(this.eventos.length>(this.eventosPorPagina-1)){
              for(let i=0;i<=(this.eventosPorPagina-1);i++)
              {
                this.eventosActuales.push(this.eventos[i]);
              }
            }else{
              for(let i=0;i<this.eventos.length;i++)
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
  cambiarNumEventosPorPagina(){
    this.eventosPorPagina=this.eventosPorPagina;
    console.log("nuevo numero de carteras por pagina: ", this.eventosPorPagina);
    var n = this.eventosPorPagina.toString();
    localStorage.setItem("ItemsPorPagina", n);

     location.reload(true);
  }
  nuevaPagina(pagina:number){
    this.currentPage=pagina;
    console.log("pagina que pido:");
    console.log(pagina);
    let x = this.eventosPorPagina * (pagina-1);
    let y = x + (this.eventosPorPagina-1);
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




  }

  borrarEvento(id:string){
      this._eventosService.borrarEvento(id)
          .subscribe(respuesta=>{
            if(respuesta){
              console.log("caracola");
              console.log(respuesta);
              console.log( "borraevento y ahora va a pedir todos los eventos de nuevo" );
            this._eventosService.getEventos("1");
            console.log( "aqui los ha pedido ya todos de nuevo y voy a hacer el router navigate a eventos" );
            location.reload(true);
            this.router.navigate(['eventos']);
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
  volverEventos(){
    location.reload(true);
  }
  buscarEvento(nombreABuscar:string){
  this.nombreBusqueda= nombreABuscar;
  this.hasBuscado=true;
  // var eventos = this.eventos;
  console.log(nombreABuscar);
  this.resultados = this.eventos.filter(evento => evento.nombreEvento.toLowerCase() == this.nombreBusqueda.toLowerCase());
  this.resultado.identificador = this.resultados[0].identificador;
  this.resultado.nombreEvento = this.resultados[0].nombreEvento;

  // location.reload(true);
  console.log(this.resultados[0].nombreEvento);

  console.log(this.resultados);
  console.log(this.resultado.nombreEvento);


  }

}
