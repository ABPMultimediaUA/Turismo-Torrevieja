import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ExpedienteInterface }  from "../../interfaces/expediente.interface";
import { ActividadInterface }  from "../../interfaces/actividad.interface";
import { TareasInterface }  from "../../interfaces/tareas.interface";
import { ContratoInterface }  from "../../interfaces/contrato.interface";
import { UsuarioInterface }  from "../../interfaces/usuario.interface";
import { CarteraInterface }  from "../../interfaces/cartera.interface";
import { EspacioInterface }  from "../../interfaces/espacio.interface";
import { ProveedorInterface }  from "../../interfaces/proveedor.interface";
import { AlertService ,PeticionesCrudService } from '../../services/index';

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
  @ViewChild("btnAct") btnAct;
  @ViewChild("btnCon") btnCon;
  @ViewChild("btnTar") btnTar;
  mostrarActividades:boolean = true;
  mostrarContratos:boolean = false;
  mostrarTareas:boolean = false;
  archivoImg:File = null;
  pestanya:number[]=[0,1,2];

  //TODO Arreglar Coordinador
  coordinador:number;

  public expediente:ExpedienteInterface={
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

  public cartera:CarteraInterface={
    identificador:"",
    nombreCartera:"",
    year:0,
    trimestre:0,
    estado:0,
    fechaCreacion:"",
    fechaActualizacion:"",
    fechaEliminacion:"",
  };

<<<<<<< HEAD
  public actividades:ActividadInterface[];
  public tareas:TareasInterface[];
  public contratos:ContratoInterface[];
  public users:UsuarioInterface[];
  public espacio:EspacioInterface[];
  public proveedor:ProveedorInterface[];


  constructor(  private _ItemService: PeticionesCrudService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
              )
  {

      this.route.params.subscribe(parametros=>{
            this.id = parametros['id'];

            //COGEMOS EL EXPEDIENTE
            this._ItemService.getItem(0,this.id,-1,-1).then(
              res => {
                this.expediente = res as ExpedienteInterface;

                //cargamos imagen
                if(this.expediente.image){
                  this.expediente.image = "https://gvent.ovh/Prueba2_1/public/img/" + this.expediente.image;
                  let o = this.etiqueta.nativeElement as HTMLImageElement;
                  o.src = this.expediente.image;
                }

                this.coordinador = +this.expediente.coordinador;

                //cogemos cartera
                this._ItemService.getItem(8,this.expediente.cartera,-1,-1).then(
                  res => {
                    this.cartera = res as CarteraInterface;
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
                this.tareas = res as TareasInterface[];
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
                this.users = res as UsuarioInterface[];
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
=======
          //cogemos cartera
          this._itemService.getItem(8,this.expediente.cartera,-1,-1,-1,"","").then( res => {
            if(typeof res != "string"){
              this.cartera = res as CarteraInterface;
              // if(this.cartera.estado < 3) this.eliminable = true;
              // else this.modificable = true;
            }
          });
        }
      })

      //COGEMOS LAS ACTIVIDADES
      this._itemService.getItem(101,this.id,-1,-1,-1,"","").then( res => {
          if(typeof res != "string") this.actividades = res as ActividadInterface[];
>>>>>>> parent of 0528d55... expediente a medias
      });
  }

<<<<<<< HEAD
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
    var t:TareasInterface;
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
=======
      //COGEMOS LAS TAREAS
      this._itemService.getItem(102,this.id,-1,-1,-1,"","").then( res => {
          if(typeof res != "string") this.tareas = res as TareasInterface[];
      });

      //COGEMOS LOS CONTRATOS
      this._itemService.getItem(103,this.id,-1,-1,-1,"","").then( res => {
          if(typeof res != "string") this.contratos = res as ContratoInterface[];
      });

      //COGEMOS LOS USUARIOS
      this._itemService.getItem(5,-1,-1,-1,-1,"","").then( res => {
          //TODO Cambiar select para recoger solamente los usuarios que
          //tengan permiso para "coordinar" un evento
          //y permiso para realizar tareas, etc.
          if(typeof res != "string") this.users = res as UsuarioInterface[];
      });

      //COGEMOS LOS ESPACIOS
      this._itemService.getItem(6,-1,-1,-1,-1,"","").then( res => {
          if(typeof res != "string") this.espacio = res as EspacioInterface[];
      });

      //COGEMOS LOS PROVEEDORES
      this._itemService.getItem(7,-1,-1,-1,-1,"","").then( res => {
          if(typeof res != "string") this.proveedor = res as ProveedorInterface[];
        }
      );
    })
>>>>>>> parent of 0528d55... expediente a medias
  }

  //ACTUALIZAR Y GUARDAR NUEVOS ITEMS
  guardarCambiosExp(){
    var expBody = this.expediente;
    delete expBody.image;
    this._ItemService.actualizarItem(0,this.id,expBody,-1)
    .then( res=> {
      if(this.archivoImg){ //ACTUALIZAMOS IMG
        this._ItemService.subirFile(0,15,this.archivoImg)
          .then( res=>{ alert("Actualizado correctamente."); console.log(res);})
          .catch( (er) => { alert("Expediente actualizado correctamente, a excepción de la imagen.");
                            console.log( er.toString()) })
      }
      else{
         alert("Actualizado correctamente.");
      }
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
            this.tareas[index] = res as TareasInterface;
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

<<<<<<< HEAD
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
=======
  // //BOTON - editar la cartera
  // editarCartera() {
  //   this.realizandoAccion = true;
  //   this._itemService.actualizarItem(8,this.cartera.identificador,this.cartera,-1)
  //     .then( res => {
  //       if(typeof res != "string") {
  //         this.carteraSinModif = Object.assign({}, res as CarteraInterface);
  //         this.alertaOk();
  //       }
  //       else this.alertaNoOk();
  //     })
  // }
>>>>>>> parent of 0528d55... expediente a medias

  cambiarPestanya(e){
    if(e == 1){
      this.mostrarActividades = true;
      this.mostrarContratos = false;
      this.mostrarTareas = false;
    }
    else if(e == 2){
      this.mostrarActividades = false;
      this.mostrarContratos = true;
      this.mostrarTareas = false;
    }
    else {
      this.mostrarActividades = false;
      this.mostrarContratos = false;
      this.mostrarTareas = true;
    }
    let b1 = this.btnAct.nativeElement as HTMLButtonElement;
    let b2 = this.btnCon.nativeElement as HTMLButtonElement;
    let b3 = this.btnTar.nativeElement as HTMLButtonElement;
    this.cambiarColorBtn(b1,this.mostrarActividades);
    this.cambiarColorBtn(b2,this.mostrarContratos);
    this.cambiarColorBtn(b3,this.mostrarTareas);
  }

  cambiarColorBtn(b,m){
    if(m){
      b.style.backgroundColor= "white";
      b.style.color = "grey";
    }
    else{
      b.style.backgroundColor = "grey";
      b.style.color = "white";
    }
  }

<<<<<<< HEAD
=======

>>>>>>> parent of 0528d55... expediente a medias
}
