import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ExpedienteInterfaz }  from "../../interfaces/expediente.interface";
import { ActividadInterface }  from "../../interfaces/actividad.interface";
import { TareaInterface }  from "../../interfaces/tareas.interface";
import { ContratoInterface }  from "../../interfaces/contrato.interface";
import { AlertService, AuthenticationService,PeticionesCrudService,LogueadoService } from '../../services/index';
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

  constructor(  private _ItemService: PeticionesCrudService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
              )
  {
      this.logueadoService.comprobarLogueado();

      this.route.params.subscribe(parametros=>{
            this.id = parametros['id'];

            //COGEMOS EL EXPEDIENTE
            this._ItemService.getItem(0,this.id,-1,-1).then(
              res => {
                this.expediente = res as ExpedienteInterfaz;
                console.log(res); //TODO Eliminar
                //TODO eliminar, esta porque el enlace de imagen guardado no sirve
                this.expediente.imagen = '';
              }
            );

            //COGEMOS LAS ACTIVIDADES
            this._ItemService.getItem(101,this.id,-1,-1).then(
              res => {
                this.actividades = res as ActividadInterface[];
                console.log(this.actividades); //TODO Eliminar
              }
            );

            //COGEMOS LAS TAREAS
            this._ItemService.getItem(102,this.id,-1,-1).then(
              res => {
                this.tareas = res as TareaInterface[];
                console.log(this.tareas); //TODO Eliminar
              }
            );

            //COGEMOS LOS CONTRATOS
            this._ItemService.getItem(103,this.id,-1,-1).then(
              res => {
                this.contratos = res as ContratoInterface[];
                console.log(this.contratos); //TODO Eliminar
              }
            );
      });
    }

  ngOnInit() {
  }

  //CREAR NUEVAS PLANTILLA
  crearPlantillaAct(){
    var a:ActividadInterface;
    a={
      capacidad:null,
      espacio:null,
      expediente:+this.id,
      fechaFinal:null,
      fechaInicio:null,
      identificador:null,
      nombreActividad:null,
      tiempoHora:null,
    };
    this.actividades.push(a);
  }

  crearPlantillaCon(){
    var c:ContratoInterface;
    c={
      archivo:null,
      clase:null,
      expediente:+this.id,
      identificador:null,
      nombreContrato:null,
      precio:null,
      proveedor:null,
      tiempo:null,
      usuario:null,
    };
    this.contratos.push(c);
  }

  crearPlantillaTar(){
    var t:TareaInterface;
    t={
      expediente:+this.id,
      finalizado:null,
      identificador:null,
      nombreTarea:null,
      usuario:null,
    };
    this.tareas.push(t);
  }

  //ELIMINAR ITEMS
  eliminarItem(a, i, event){
    console.log(i);
    var form = event.parentElement.parentElement.parentElement.parentElement;
    if (i != null){
      var mensaje = "Va a eliminarse de forma definitiva.\n"+
                    "¿Continuar?";
      if(confirm(mensaje)){
        this._ItemService.eliminarItem(a,i,-1).then(form.parentNode.removeChild(form));
      }
    }
    else{
      form.parentNode.removeChild(form);
    }
  }

  //ACTUALIZAR Y GUARDAR NUEVOS ITEMS
  guardarCambiosExp(){
    this._ItemService.actualizarItem(0,this.id,this.expediente,-1)
      .then( res=> {alert("Actualizado correctamente."); })
      .catch( (err) => { console.log( err.toString() ); })
  }

  crearModificarActConTar(i,a){
    if(a.identificador != null){
      this._ItemService.actualizarItem(i,a.identificador,a,-1)
        .then( res=> {alert("Actualizado correctamente."); })
        .catch( (err) => { console.log( err.toString() ); })
    }
    else{
      this._ItemService.crearItem(i,a)
        .then( res=> {alert("Creado correctamente."); })
        .catch( (err) => { console.log( err.toString() ); })
    }
  }
}
