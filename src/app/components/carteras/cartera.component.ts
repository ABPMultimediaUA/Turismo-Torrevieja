import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Cartera }  from "../../interfaces/cartera.interface";
import { Usuario }  from "../../interfaces/usuario.interface";
import { ExpedienteInterfaz }  from "../../interfaces/expediente.interface";
import { AlertService, AuthenticationService, PeticionesCrudService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html'
})

export class CarteraComponent implements OnInit {
  formExVisible = false;
  errorCartera = false;
  rgstrCartera = false;
  permisoEditar = false;
  errorCarteraActualizar = false;


  //TituloNuevo = "";
  errorMensaje:string[]=[];

  public cartera:Cartera={
    identificador:"",
    nombreCartera:"string",
    year:0,
    trimestre:0,
    estado:0,
    fechaCreacion:"",
    fechaActualizacion:"",
    fechaEliminacion:""
  };

  public expediente:ExpedienteInterfaz[];
  public users:Usuario[];
  public expN:ExpedienteInterfaz={
    identificador:null,
    avance:"",
    cartera:0,
    coordinador:"",
    detalle:"",
    fechaFin:null,
    fechaInicio:null,
    image:"",
    nombreExpediente:"",
    titulo:"",
  };

  nuevo:boolean = false;
  id:string;

  constructor( private _carterasService: PeticionesCrudService,
                  private router:Router,
                  private route:ActivatedRoute,//esto es para pasar como parametro
                  public  logueadoService: LogueadoService
                )
  {
    this.logueadoService.comprobarLogueado();

    this.route.params.subscribe(parametros=>{
      this.id = parametros['id'];

      //COGEMOS LA CARTERA
      this._carterasService.getItem(8,this.id,-1,-1).then(
        res => {
          this.cartera = res as Cartera;
      });

      //COGEMOS SU EXPEDIENTES
      this._carterasService.getItem(106,this.id,-1,-1).then(
        res => {
          this.expediente = res as ExpedienteInterfaz[];
          console.log(res);
      });

      //COGEMOS LOS USUARIOS
      this._carterasService.getItem(5,-1,-1,-1).then(
        res => {
          this.users = res as Usuario[];
      });
    });
  }

  ngOnInit() {
  }



  guardar(){
    this._carterasService.actualizarItem(8,this.id,this.cartera,-1)
      .then( res=> { alert("Actualizado correctamente."); })
      .catch( (err) => { alert("Se ha producido un error inesperado.\nNo se ha podido actualizar la cartera.");
                         console.log( err.toString()) })
  }

  puedeEditar(){
    console.log("1.puedeEditar? =",this.permisoEditar);
    this.permisoEditar = true;
    console.log("2.puedeEditar? =",this.permisoEditar);
    return this.permisoEditar;
  }

  mostrarFormExp(i){
      this.formExVisible = i;
      this.borrarFormExp();
  }

  crearNuevoExp(){
    this.expN.cartera = +this.id;
    this.expN.avance += 0;
    this._carterasService.crearItem(0,this.expN)
      .then( res=> {
        alert("Expediente creado correctamente.");
        this.expediente.push(res as ExpedienteInterfaz);
        this.borrarFormExp();
        this.formExVisible = false;
      })
      .catch( (err) => { alert("Se ha producido un error inesperado.\nNo se ha podido crear el expediente.");
                         console.log( err.toString()) })
  }

  borrarFormExp(){
    this.expN={
      identificador:null,
      avance:"",
      cartera:0,
      coordinador:"",
      detalle:"",
      fechaFin:null,
      fechaInicio:null,
      image:"",
      nombreExpediente:"",
      titulo:"",
    }
  }

}
