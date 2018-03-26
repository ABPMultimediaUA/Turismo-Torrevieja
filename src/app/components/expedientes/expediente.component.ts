import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ExpedienteInterfaz }  from "../../interfaces/expediente.interface";
import { ActividadInterface }  from "../../interfaces/actividad.interface";
import { TareaInterface }  from "../../interfaces/tareas.interface";
import { ContratoInterface }  from "../../interfaces/contrato.interface";
import { Usuario }  from "../../interfaces/usuario.interface";
import { Cartera }  from "../../interfaces/cartera.interface";
import { EspacioInterface }  from "../../interfaces/espacio.interface";
import { ProveedorInterface }  from "../../interfaces/proveedor.interface";
import { AlertService, AuthenticationService,PeticionesCrudService,LogueadoService } from '../../services/index';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.css']
})

export class ExpedienteComponent implements OnInit {

  First_accessToken:string="Bearer ";
  Secound_accessToken:string=localStorage.accesToken;

  id:string;
  modificable:boolean = false;
  eliminable:boolean = false;
  errorActualizarItem = false;
  errorMensaje:string[] = [];
  itemActualizado = false;
  @ViewChild("etiquetaImgExp") etiqueta;
  archivoImg:File = null;
  // permisosCambiados:string[]=[];
  // auxPermisos:string[]=[];

  //TODO Arreglar Coordinador
  coordinador:number;

  public expediente:ExpedienteInterfaz={
    identificador:0,
    avance:0,
    cartera:0,
    coordinador:0,
    detalle:"",
    fechaFin:null,
    fechaInicio:null,
    image:"",
    nombreExpediente:"",
    titulo:"",
  };

  public cartera:Cartera={
    identificador:"",
    nombreCartera:"",
    year:0,
    trimestre:0,
    estado:0,
    fechaCreacion:"",
    fechaActualizacion:"",
    fechaEliminacion:"",
  };

  public actividades:ActividadInterface[];
  public tareas:TareaInterface[];
  public contratos:ContratoInterface[];
  public users:Usuario[];
  public espacio:EspacioInterface[];
  public proveedor:ProveedorInterface[];


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
                // this.expediente["_metodo"] = "put";
                // this.expediente.image=null;
                console.log(this.expediente);
                this.coordinador = +this.expediente.coordinador;

                //COGEMOS LA CARTERA
                this._ItemService.getItem(8,this.expediente.cartera,-1,-1).then(
                  res => {
                    this.cartera = res as Cartera;
                    if(this.cartera.estado < 3) this.eliminable = true;
                    else this.modificable = true;
                  }
                );
              }
            );

            //COGEMOS LAS ACTIVIDADES
            this._ItemService.getItem(101,this.id,-1,-1).then(
              res => {
                this.actividades = res as ActividadInterface[];
              }
            );

            //COGEMOS LAS TAREAS
            this._ItemService.getItem(102,this.id,-1,-1).then(
              res => {
                this.tareas = res as TareaInterface[];
              }
            );

            //COGEMOS LOS CONTRATOS
            this._ItemService.getItem(103,this.id,-1,-1).then(
              res => {
                this.contratos = res as ContratoInterface[];
              }
            );

            //COGEMOS LOS USUARIOS
            this._ItemService.getItem(5,-1,-1,-1).then(
              res => {
                //TODO Cambiar select para recoger solamente los usuarios que
                //tengan permiso para "coordinar" un evento
                //y permiso para realizar tareas, etc.
                this.users = res as Usuario[];
              }
            );

            //COGEMOS LOS ESPACIOS
            this._ItemService.getItem(6,-1,-1,-1).then(
              res => {
                this.espacio = res as EspacioInterface[];
              }
            );

            //COGEMOS LOS PROVEEDORES
            this._ItemService.getItem(7,-1,-1,-1).then(
              res => {
                this.proveedor = res as ProveedorInterface[];
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
      capacidadMinimo:null,
      capacidadMaximo:null,
      espacio:null,
      expediente:+this.id,
      fechaFinal:null,
      fechaInicio:null,
      identificador:null,
      nombreActividad:null,
      HoraInicio:null,
      HoraFinal:null,
      detalleEntrada:null,
      precioEntrada:null,
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
  eliminarItem(a, i, index){
  console.log(index);
    if (i != null){
      var mensaje = "Va a eliminarse de forma definitiva.\n"+
                    "¿Continuar?";
      if(confirm(mensaje)){
        this._ItemService.eliminarItem(a,i,-1).then( res=>{
          if(a==1){ this.actividades.splice(index,1); }
          else if(a==3){ this.contratos.splice(index,1); }
          else if(a==2){ this.tareas.splice(index,1); }
        });
      }
    }
    else{
      if(a==1){
        this.actividades.splice(index,1);
      }
      else if(a==3){
        this.contratos.splice(index,1);
      }
      else if(a==2){
        this.tareas.splice(index,1);
      }
    }
  }

  //ACTUALIZAR Y GUARDAR NUEVOS ITEMS
  guardarCambiosExp(){
    var expBody = this.expediente;
    delete expBody.image;
    this._ItemService.actualizarItem(0,this.id,expBody,-1)
    .then( res=> {
      // if(this.archivoImg){ //ACTUALIZAMOS IMG
      //   this._ItemService.subirFile(0,this.id,this.archivoImg)
      //     .then( res=>{ alert("Actualizado correctamente."); console.log(res);})
      //     .catch( (er) => { alert("Expediente actualizado correctamente, a excepción de la imagen.");
      //                       console.log( er.toString()) })
      // }
      // else{
         alert("Actualizado correctamente." + "SIN IMAGEN");
      // }
    })
    .catch( (err) => { alert("Se ha producido un error inesperado.\nNo se ha podido actualizar el expediente.");
                       console.log( err.toString()) })
  }

  crearModificarActConTar(i,a,index){
    if(a.identificador != null){
      this._ItemService.actualizarItem(i,a.identificador,a,-1)
        .then( res=> { alert("Actualizado correctamente."); })
        .catch( (err) => { console.log( err.toString() ); })
    }
    else{
      this._ItemService.crearItem(i,a)
        .then( res=> {
          if(i==1){
            this.actividades[index] = res as ActividadInterface;
          }
          else if(i==3){
            this.contratos[index] = res as ContratoInterface;
          }
          else if(i==2){
            this.tareas[index] = res as TareaInterface;
          }
          alert("Creado correctamente."); })
        .catch( (err) => { console.log( err.toString() ); })
    }
  }

  cargarImg(files: FileList){
    this.archivoImg = files.item(0);
    var exp = this.expediente;
    var etiqueta = this.etiqueta;
    var r = new FileReader();
    r.onload = function(e){
      let o = etiqueta.nativeElement as HTMLImageElement;
      o.src = r.result;
      exp.image = o.alt = files[0].name;
    }
    r.readAsDataURL(files[0]);
  }

  borrarItem(){
    if(confirm("Si aceptas el expediente será eliminado.\n¿Continuar?")){
      this._ItemService.eliminarItem(0,this.id,-1).then(
        res => {
            location.reload(true);
            this.router.navigate(['expedientes']);
        }
      );
    }
  }


}
