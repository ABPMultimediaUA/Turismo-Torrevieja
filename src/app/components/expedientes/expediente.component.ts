import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ExpedienteInterfaz }  from "../../interfaces/expediente.interface";
import { ActividadInterface }  from "../../interfaces/actividad.interface";
import { TareasInterface }  from "../../interfaces/tareas.interface";
import { AlertService, AuthenticationService, ExpedienteService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})
export class ExpedienteComponent implements OnInit {

  id:string;
  errorActualizarItem = false;
  errorMensaje:string[]=[];
  itemActualizado = false;
  // permisosCambiados:string[]=[];
  // auxPermisos:string[]=[];

  public expediente:ExpedienteInterfaz={
    identificador:0,
    actor:0,
    aforo:0,
    avance:"",
    cartera:0,
    cif:"",
    coordinador:"",
    detalle:"",
    espacio:0,
    evento:"",
    fechaFin:null,
    fechaInicio:null,
    hora:0,
    imagen:"",
    nombreExpediente:"",
    portal:"",
    precio:0,
    precioEntrada:0.0,
    separacion:"",
    titulo:"",
  };

  public actividad:ActividadInterface={
    capacidad:0,
    espacio:0,
    expediente:0,
    fechaActualizacion:"",
    fechaFinal:"",
    fechaInicio:"",
    identificador:0,
    nombreActividad:"",
    tiempoHora:0,
  };

  public tareas:TareasInterface={
    expediente:0,
    finalizado:0,
    identificador:0,
    nombreTarea:"",
    usuario:0,
  }

  constructor(  private _ItemService: ExpedienteService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
              )
  {
      this.logueadoService.comprobarLogueado();

      this.route.params.subscribe(parametros=>{
            this.id = parametros['id'];

            //COGEMOS EL EXPEDIENTE
            this._ItemService.getItem(0,this.id).then(
              res => {
                this.expediente = res as ExpedienteInterfaz;
                console.log(res); //TODO Eliminar
                //TODO eliminar, esta porque el enlace de imagen guardado no sirve
                this.expediente.imagen = 'https://web.ua.es/es/actualidad-universitaria/imagenes/febrero18-2da-quin/estrella-supergigante1.jpg';
              }
            );

            //COGEMOS LAS ACTIVIDADES
            this._ItemService.getItem(4,this.id).then(
              res => {
                this.actividad = res as ActividadInterface;
                console.log(this.actividad); //TODO Eliminar

              }
            );

            //COGEMOS LAS TAREAS
            this._ItemService.getItem(5,this.id).then(
              res => {
                this.tareas = res as TareasInterface;
                console.log(this.tareas); //TODO Eliminar
              }
            );
      });
    }

  ngOnInit() {
  }

}
