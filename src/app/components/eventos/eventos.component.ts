import { Component, OnInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import { MatIcon } from '@angular/material';
import {LoginComponent} from '../login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule, MatButtonModule } from '@angular/material';

import { Element }  from "../../interfaces/element.interface";
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




//   ELEMENT_DATA: Element[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
//   displayedColumns = ['position', 'name', 'weight', 'symbol'];
//   dataSource = new MatTableDataSource(this.ELEMENT_DATA);
//
//
//   @ViewChild(MatSort) sort: MatSort;
//
//     /**
//      * Set the sort after the view init since this component will
//      * be able to query its view for the initialized sort.
//      */
//     ngAfterViewInit() {
//       this.dataSource.sort = this.sort;
//     }
    // eventosString:string = localStorage.getItem("eventos");

    // ELEMENT_DATA: Evento[] = this.eventos;
    // // ELEMENT_DATA: Evento[] = [
    // //   {identificador: '1', nombreEvento: 'etdadadda', usuario: '1', fechaCreacion: '2017-11-29 14:19:23', fechaEliminacion: null, fechaActualizacion: '2018-02-21 15:26:37'},
    // //   {identificador: "2", nombreEvento: "rerum", usuario: "22", fechaCreacion: "2017-11-29 14:19:23", fechaEliminacion: null, fechaActualizacion: "2017-11-29 14:19:23"},
    // // ];
    // displayedColumns = ['identificador', 'nombreEvento', 'usuario', 'fechaCreacion','fechaActualizacion'];
    // dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    ELEMENT_DATA: Evento[];
    // ELEMENT_DATA: Evento[] = [
    //   {identificador: '1', nombreEvento: 'etdadadda', usuario: '1', fechaCreacion: '2017-11-29 14:19:23', fechaEliminacion: null, fechaActualizacion: '2018-02-21 15:26:37'},
    //   {identificador: "2", nombreEvento: "rerum", usuario: "22", fechaCreacion: "2017-11-29 14:19:23", fechaEliminacion: null, fechaActualizacion: "2017-11-29 14:19:23"},
    // ];
    displayedColumns = ['identificador', 'nombreEvento', 'usuario', 'fechaCreacion','fechaActualizacion'];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    // applyFilter(filterValue: string) {
    //   filterValue = filterValue.trim(); // Remove whitespace
    //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    //   this.dataSource.filter = filterValue;
    // }
    @ViewChild(MatSort) sort: MatSort;

      /**
       * Set the sort after the view init since this component will
       * be able to query its view for the initialized sort.
       */
      ngAfterViewInit() {
          console.log("entra en el sort ese");

        this.dataSource.sort = this.sort;
        console.log(this.dataSource.sort);
      }


  // k:number;
  constructor(private _eventosService:EventosService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService
            ) {
              this.logueadoService.comprobarLogueado();
                console.log("this.eventos:");
              console.log(this.eventos);
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
            console.log("this.eventos222:");
            console.log(this.eventos);

            //
            // localStorage.setItem("eventos", this.eventos.toString());
            //
            // console.log("eventosString=", this.eventosString);
            this.ELEMENT_DATA = this.eventos;
            // ELEMENT_DATA: Evento[] = [
            //   {identificador: '1', nombreEvento: 'etdadadda', usuario: '1', fechaCreacion: '2017-11-29 14:19:23', fechaEliminacion: null, fechaActualizacion: '2018-02-21 15:26:37'},
            //   {identificador: "2", nombreEvento: "rerum", usuario: "22", fechaCreacion: "2017-11-29 14:19:23", fechaEliminacion: null, fechaActualizacion: "2017-11-29 14:19:23"},
            // ];
            this.displayedColumns = ['identificador', 'nombreEvento', 'usuario', 'fechaCreacion','fechaActualizacion'];
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.sort = this.sort;

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
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
