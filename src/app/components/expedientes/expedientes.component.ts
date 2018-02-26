import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';

import { Expediente }  from "../../interfaces/expediente.interface";
import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, ExpedientesService, EventosService, LogueadoService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html'
})
export class ExpedientesComponent implements OnInit {
  expedientes:any[] = [];
  resultados:any[] = [];
  loading:boolean = true;
  hasBuscado:boolean = false

  nombreBusqueda:string = "";
  // filterargs = {title: 'hello'};
  // items = [{title: 'hello world'}, {title: 'hello kitty'}, {title: 'foo bar'}];
  filterargs = {nombreExpediente: this.nombreBusqueda};
  public resultado:Expediente={
    identificador:"",
    evento:"",
    cartera:0,
    espacio:0,
    nombreExpediente:"",
    fechaInicio:"",
    fechaFin:"",
    hora:0,
    aforo:0,
    titulo:"",
    actor:0,
    precio:0,
    portal:"",
    separacion:"",
    precioEntrada:0,
    coordinador:"",
    cif:0,
    detalle:"",
    imagen:"",
    avance:"",
    fechaCreacion:"",
    fechaActualizacion:"",
    fechaEliminacion:"",
  };
  // nohasBuscado:boolean = true;
  //pagination
  paginacion:any = [];
  cantidadPagina:any[]=[];
  expedientesPorPagina:number=10;
  ItemsPorPagina:string;
  expedientesActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;



  // k:number;
  constructor(private _expedientesService:ExpedientesService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService
            ) {
              this.logueadoService.comprobarLogueado();

              console.log("estaLogueado:");
              console.log(this.logueadoService.estaLogueado);
        this._expedientesService.getExpedientes("1")
          .subscribe( data =>{
            console.log(data);//la data del getHeroes

            this.expedientes= data.data;
            console.log("array de expedientes:");
            console.log(this.expedientes);
            console.log("expedientes[3]:");
            console.log(this.expedientes[3]);

            this.ItemsPorPagina = localStorage.getItem("ItemsPorPagina");
            console.log("cojo Items por pagina de localstorage:",this.ItemsPorPagina );
            this.expedientesPorPagina = parseInt(this.ItemsPorPagina);
            console.log("paso itemspor pagina a number y lo meto en expedientes por pagina:",this.expedientesPorPagina);
            this.totalPaginas = Math.ceil(this.expedientes.length/this.expedientesPorPagina);
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

            if(this.expedientes.length>(this.expedientesPorPagina-1)){
              for(let i=0;i<=(this.expedientesPorPagina-1);i++)
              {
                this.expedientesActuales.push(this.expedientes[i]);
              }
            }else{
              for(let i=0;i<this.expedientes.length;i++)
              {
                this.expedientesActuales.push(this.expedientes[i]);
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
  cambiarNumExpedientesPorPagina(){
    this.expedientesPorPagina=this.expedientesPorPagina;
    console.log("nuevo numero de carteras por pagina: ", this.expedientesPorPagina);
    var n = this.expedientesPorPagina.toString();
    localStorage.setItem("ItemsPorPagina", n);

     location.reload(true);
  }
  nuevaPagina(pagina:number){
    this.currentPage=pagina;
    console.log("pagina que pido:");
    console.log(pagina);
    let x = this.expedientesPorPagina * (pagina-1);
    let y = x + (this.expedientesPorPagina-1);
    this.expedientesActuales=[];

    if(pagina==this.totalPaginas){
      for(let i=x;i<this.expedientes.length;i++)
      {
        this.expedientesActuales.push(this.expedientes[i]);
      }
    }else{
      for(let i=x;i<=y;i++)
      {
        this.expedientesActuales.push(this.expedientes[i]);
      }
    }




  }

  borrarExpediente(id:string){
      this._expedientesService.borrarExpediente(id)
          .subscribe(respuesta=>{
            if(respuesta){
              console.log("caracola");
              console.log(respuesta);
              console.log( "borraexpediente y ahora va a pedir todos los expedientes de nuevo" );
            this._expedientesService.getExpedientes("1");
            console.log( "aqui los ha pedido ya todos de nuevo y voy a hacer el router navigate a expedientes" );
            location.reload(true);
            this.router.navigate(['expedientes']);
            // this.refresh();
            }else{
              //todo bien
              delete this.expedientes[id];
            //   console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
            // this._usuariosService.getUsuarios();
            // console.log( "aqui los ha pedido ya todos de nuevo" );
            // this.refresh();


            }

          })

    }
  volverExpedientes(){
    location.reload(true);
  }
  buscarExpediente(nombreABuscar:string){
  this.nombreBusqueda= nombreABuscar;
  this.hasBuscado=true;

  // var eventos = this.eventos;
  console.log(nombreABuscar);
  this.resultados = this.expedientes.filter(expediente => expediente.nombreExpediente.toLowerCase() == this.nombreBusqueda.toLowerCase());
  this.resultado.identificador = this.resultados[0].identificador;
  this.resultado.nombreExpediente = this.resultados[0].nombreExpediente;

  // location.reload(true);
  console.log(this.resultados[0].nombreExpediente);

  console.log(this.resultados);
  console.log(this.resultado.nombreExpediente);


  }

}
