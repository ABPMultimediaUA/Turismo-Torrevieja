import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ExpedienteInterfaz }  from "../../interfaces/expediente.interface";
import { ActividadInterface }  from "../../interfaces/actividad.interface";
import { TareaInterface }  from "../../interfaces/tareas.interface";
import { ContratoInterface }  from "../../interfaces/contrato.interface";
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
    evento:0,
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

  public actividades:ActividadInterface[];
  public tareas:TareaInterface[];
  public contratos:ContratoInterface[];

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
                this.expediente.imagen = '';
              }
            );

            //COGEMOS LAS ACTIVIDADES
            this._ItemService.getItem(4,this.id).then(
              res => {
                this.actividades = res as ActividadInterface[];
                console.log(this.actividades); //TODO Eliminar

              }
            );

            //COGEMOS LAS TAREAS
            this._ItemService.getItem(5,this.id).then(
              res => {
                this.tareas = res as TareaInterface[];
                console.log(this.tareas); //TODO Eliminar
              }
            );

            //COGEMOS LOS CONTRATOS
            this._ItemService.getItem(6,this.id).then(
              res => {
                this.contratos = res as ContratoInterface[];
                console.log(this.contratos); //TODO Eliminar
              }
            );
      });
    }

  ngOnInit() {
  }

  crearPlantillaActividad(){
    var nuevasActividades = document.getElementById("nuevaActividad");
    // var nuevoDiv = '<div class="row CuadroActividad"></div>';
    var nuevoDiv = document.createElement('div');
    nuevoDiv.setAttribute("class","row CuadroActividad");
    nuevoDiv.innerHTML = '<div class="col-sm-3">'+
                      '<label>Nombre de la actividad</label>'+
                      '<input [(ngModel)]="" name="" class="form-control" required type="text">'+
                    '</div>'+
                    '<div class="col-sm-3">'+
                      '<label>Fecha inicio</label>'+
                      '<input [(ngModel)]="" name="" class="form-control" required type="text">'+
                    '</div>'+
                    '<div class="col-sm-3">'+
                      '<label>Fecha final</label>'+
                      '<input [(ngModel)]="" name="" class="form-control" required type="text">'+
                    '</div>'+
                    '<div class="col-sm-3">'+
                      '<label>Hora</label>'+
                      '<input [(ngModel)]="" name="" class="form-control" required type="text">'+
                    '</div>'+
                    '<div class="col-sm-3">'+
                      '<label>Espacio</label>'+
                      '<input [(ngModel)]="" name="" class="form-control" required type="text">'+
                    '</div>'+
                    '<div class="col-sm-3">'+
                      '<label>Capacidad</label>'+
                      '<input [(ngModel)]="" name="" class="form-control" required type="text">'+
                    '</div>'+
                    '<div class="col-sm-3">'+
                      '<button (click)="eliminarActividad($event.target)" type="button" class="btn btn-outline-danger">'+
                        '<span class="icon-trash"></span>'+
                      '</button>'+
                    '</div>';
    nuevasActividades.appendChild(nuevoDiv);
  }

  eliminarActividad(i,event: any){
    var mensaje = "¿Está seguro de que desea eliminar esta actividad?\n"+
    "(Hasta que no se guarden los cambios del expediente no se realizará la eliminación.)";
    if(confirm(mensaje)){
      var activ = event.parentElement.parentElement.parentElement;
      activ.parentNode.removeChild(activ);
      //TODO registrar el cambio
    }
  }

  guardarCambios(){
    //ACTUALIZAR EXPEDIENTE
    // console.log(JSON.stringify(this.expediente));
    //TODO VER POR QUE FALLA Y POR QUE CADA VARIABLE CAMBIA
    // console.log(this.expediente.evento);
    // this.expediente.evento = +this.expediente.evento;
    // console.log(this.expediente);
    this._ItemService.actualizarItem(0,this.id,this.expediente).then(
      res => {
        console.log(res);
      }
    );
  }

}
