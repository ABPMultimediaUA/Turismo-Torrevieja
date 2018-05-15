import { Component, OnInit, ViewChild }         from '@angular/core';
import { PeticionesCrudService, AuthService }   from '../../services/index';
import { ActivatedRoute }                       from "@angular/router";
import { VentanaEmergenteComponent }            from '../ventana-emergente/ventana-emergente.component';
import { VentanaEmergentePreguntaComponent }    from '../ventana-emergente/ventana-emergente-pregunta.component';
import { VentanaEmergentePdfComponent }         from '../ventana-emergente/ventana-emergente-pdf.component';
import { MatDialog }                            from '@angular/material';
import { ExpedienteInterface }                  from "../../interfaces/expediente.interface";
import { ActividadInterface }                   from "../../interfaces/actividad.interface";
import { TareasInterface }                      from "../../interfaces/tareas.interface";
import { ContratoInterface }                    from "../../interfaces/contrato.interface";
import { UsuarioInterface }                     from "../../interfaces/usuario.interface";
import { CarteraInterface }                     from "../../interfaces/cartera.interface";
import { EspacioInterface }                     from "../../interfaces/espacio.interface";
import { ProveedorInterface }                   from "../../interfaces/proveedor.interface";
import { Router }                               from "@angular/router";
import { Observable, BehaviorSubject }          from 'rxjs/Rx';

import { FormArray,FormGroup,FormControl } from "@angular/forms";

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['../../app.component.css']
})

export class ExpedienteComponent implements OnInit {

  id:number;
  expediente:ExpedienteInterface={
    identificador:null,
    nombreExpediente:null,
    avance:null,
    cartera:null,
    coordinador:null,
    detalle:null,
    fechaFin:null,
    fechaInicio:null,
    image:null,
    titulo:null,
  };
  expedienteSinModif:ExpedienteInterface;
  cartera:CarteraInterface={
    identificador:null,
    nombreCartera:null,
    year:null,
    trimestre:null,
    estado:null,
    fechaCreacion:null,
    fechaActualizacion:null,
    fechaEliminacion:null,
  };
  expFechaCreacion:string = undefined;
  actividades:ActividadInterface[];
  tareas:TareasInterface[];
  tareaBloqueada:boolean[]=[];
  contratos:ContratoInterface[]=[];
  users:UsuarioInterface[];
  espacio:EspacioInterface[];
  proveedor:ProveedorInterface[];

  bloqCampos:boolean = true;          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  fechaCreacion:string = "";          //Fecha modificada para mostrar por pantalla
  realizandoAccion:boolean = false;   //Mientras se esté editando la cartera

  porcentajeAvanzado = new BehaviorSubject<number>(0);
  tareasTerminadas = new BehaviorSubject<number>(0);
  tareasPropuestas = new BehaviorSubject<number>(0);
  contratosTerminados = new BehaviorSubject<number>(0);
  contratosPropuestos = new BehaviorSubject<number>(0);
  colorSpinner = new BehaviorSubject<string>("warn");

  archivoImg:File = null;             //guardar el archivo para mandarlo en la peticion
  archivoPDF:File[] = [];             //guardar el archivo para mandarlo en la peticion
  imgInsertada:boolean = false;        //Activa el boton de actualizar exp si se inserta una imagen
  nombrePDF = new BehaviorSubject<string[]>([]);

  @ViewChild("etiquetaImgExp") etiqueta;  //La etiqueta html img
  @ViewChild("formulario") formulario;
  @ViewChild("forma") formularios;
  @ViewChild("imgInput") imgInput : any;


  constructor(
    private _itemService: PeticionesCrudService,
    private _authService:AuthService,
    private route:ActivatedRoute,
    public dialog: MatDialog,
    private router:Router,
  ) {
    this.route.params.subscribe( param => {
      this.id = param['id'];
      this._itemService.getItem(0,param.id,-1,-1,-1,"","").then( res => {
        if(typeof res != "string"){
          let r = res as any;
          this.expediente = r.data as ExpedienteInterface;
          this.expedienteSinModif = Object.assign({}, r.data as ExpedienteInterface);
          this.expFechaCreacion = r.data.fechaCreacion.split(' ')[0];
          this.interpretarAvance(this.expediente.avance);

          //cargamos imagen
          if(this.expediente.image){
            this.expediente.image = "https://gvent.ovh/Prueba2_1/public/img/" + this.expediente.image;
            let o = this.etiqueta.nativeElement as HTMLImageElement;
            o.src = this.expediente.image;
          }
          else{
            let o = this.etiqueta.nativeElement as HTMLImageElement;
            o.src = '..\\assets\\imgDefaultInputImg\\img_por_defecto.JPG';
          }

          //cogemos cartera
          this._itemService.getItem(8,this.expediente.cartera,-1,-1,-1,"","").then( res => {
            if(typeof res != "string"){
              let r = res as any;
              this.cartera = r.data as CarteraInterface;

              if(this.cartera.estado != 1){
                //COGEMOS LAS ACTIVIDADES
                this._itemService.getItem(101,this.id,-1,-1,-1,"","").then( res => {
                    if(typeof res != "string") {
                      let r = res as any;
                      this.actividades = r.data as ActividadInterface[];
                      console.log(this.actividades)
                    }
                });

                //COGEMOS LAS TAREAS
                this._itemService.getItem(102,this.id,-1,-1,-1,"","").then( res => {
                    if(typeof res != "string") {
                      let r = res as any;
                      this.tareas = r.data as TareasInterface[];
                      for(var x = 0; x < this.tareas.length; x++){
                        if(+this.tareas[x].finalizado == 1) this.tareaBloqueada.push(true);
                        else this.tareaBloqueada.push(false);
                      }
                      // console.log(this.tareas)
                    }
                });

                //COGEMOS LOS CONTRATOS
                this._itemService.getItem(103,this.id,-1,-1,-1,"","").then( res => {
                    if(typeof res != "string") {
                      let r = res as any;
                      this.contratos = r.data as ContratoInterface[];
                      for(var x = 0; x < this.contratos.length; x++){
                        this.archivoPDF.push(null);
                        this.nombrePDF.getValue().push("");
                      }
                      // console.log(this.contratos)
                    }
                });

                //COGEMOS LOS USUARIOS
                this._itemService.getItem(308,-1,-1,-1,-1,"","").then( res => {
                    //TODO Cambiar select para recoger solamente los usuarios que
                    //tengan permiso para "coordinar" un evento
                    //y permiso para realizar tareas, etc.
                    if(typeof res != "string") {
                      let r = res as any;
                      this.users = r.data as UsuarioInterface[];
                      // console.log(this.users)
                    }
                });

                //COGEMOS LOS ESPACIOS
                this._itemService.getItem(310,-1,-1,-1,-1,"","").then( res => {
                    if(typeof res != "string") {
                      let r = res as any;
                      this.espacio = r.data as EspacioInterface[];
                      // console.log(this.espacio)
                    }
                });

                //COGEMOS LOS PROVEEDORES
                this._itemService.getItem(311,-1,-1,-1,-1,"","").then( res => {
                    if(typeof res != "string") {
                      let r = res as any;
                      this.proveedor = r.data as ProveedorInterface[];
                      // console.log(this.proveedor)
                    }
                  }
                );
              }
            }
          });
        }
      })
    })
  }

  ngOnInit() {
  }

  //Bloquea y desbloquea los campos del form al pulsar los btn EDITAR o CANCELAR
  disable_enable_campos() {
    if(this.bloqCampos) this.bloqCampos = false;
    else {
      this.restaurarValores();
      this.bloqCampos = true;
    }
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  restaurarValores() {
    this.formulario.reset(this.expedienteSinModif, false);
    this.imgInput.nativeElement.value = "";
    if(this.expedienteSinModif.image){
      let o = this.etiqueta.nativeElement as HTMLImageElement;
      o.src = "https://gvent.ovh/Prueba2_1/public/img/" + this.expedienteSinModif.image;
    }
    else{
      let o = this.etiqueta.nativeElement as HTMLImageElement;
      o.src = '..\\assets\\imgDefaultInputImg\\img_por_defecto.JPG';
    }
  }

  //BOTON - editar expediente
  editarExp() {
    var expBody = this.expediente;
    delete expBody.image;
    this._itemService.actualizarItem(0,this.id,expBody,-1)
    .then( res=> { console.log(res)
      if(typeof res != "string"){
        this.expedienteSinModif = Object.assign({}, res as ExpedienteInterface);
        this.formulario.reset(this.expedienteSinModif, false);
        if(this.archivoImg){ //ACTUALIZAMOS IMG
          this._itemService.subirFile(0,this.id,this.archivoImg)
            .then( res=>{
              this.imgInsertada = false;
              this.imgInput.nativeElement.value = "";
              if(typeof res != "string") this.alertaOk("Expediente actualizado correctamente.");
              else this.alertaNoOk("Se ha producido un error inesperado subiendo la imagen.");
            })
        }
        else this.alertaOk("Expediente actualizado correctamente.");
      }
      else this.alertaNoOk("Se ha producido un error inesperado actualizando el expediente.");
    })
  }

  editarAvanceExp(){
    var auxTareasFinalizadas = 0;
    var auxTareasCreadas = 0;

    var auxContratosFinalizados = 0;
    var aucContratosCreados = 0;

    for(var x=0; x < this.tareas.length && x<9; x++){
      if(this.tareas[x].identificador){
        auxTareasCreadas++;
        if(+this.tareas[x].finalizado == 1) auxTareasFinalizadas++;
      }
    }

    for(var z=0; z < this.contratos.length && z<9; z++){
      if(this.contratos[z].identificador){
        aucContratosCreados++;
        if(+this.contratos[z].terminado == 1) auxContratosFinalizados++;
      }
    }

    var aux = auxTareasFinalizadas.toString() + auxTareasCreadas.toString() + "." + auxContratosFinalizados.toString() + aucContratosCreados.toString();
    var body={
      avance:aux,
    }
    this._itemService.actualizarItem(0,this.id,body,-1);
  }

  //Ventana emergente si se ha realizado una peticion y todo ha ido bien
  alertaOk(sms:string) {
    let icono:number = 0;
    const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
      height: '17em',
      width: '32em',
      data: { item: sms, item2: icono }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.bloqCampos = true;
      this.realizandoAccion = false;
    });
  }

  //Ventana emergente si se ha realizado una peticion y ha habido algun error
  alertaNoOk(sms:string) {
    let icono:number = 1;
    const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
      height: '17em',
      width: '32em',
      data: { item: sms, item2: icono }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.bloqCampos = true;
      this.realizandoAccion = false;
    });
  }

  // CREAR NUEVAS PLANTILLA
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
       nombreActividad:"* Nueva actividad",
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
       fichero:null,
       clase:null,
       expediente:+this.id,
       identificador:null,
       nombreContrato:"* Nuevo contrato",
       precio:null,
       proveedor:null,
       tiempo:null,
       usuario:null,
       observaciones:null,
       terminado:null
     };
     this.contratos.push(c);
     this.archivoPDF.push(null);
     this.nombrePDF.getValue().push("");
     this.contratosPropuestos.next(this.contratosPropuestos.getValue()+1);
   }

   crearPlantillaTar(){
     var t:TareasInterface;
     t={
       expediente:+this.id,
       finalizado:null,
       identificador:null,
       nombreTarea:"* Nueva tarea",
       usuario:null,
       fechaCreacion:null,
     };
     this.tareas.push(t);
     this.tareaBloqueada.push(false);
     this.tareasPropuestas.next(this.tareasPropuestas.getValue()+1);
     this.calcularAvance();
   }

   //ELIMINAR ITEMS
   eliminarItem(a, i, index){
    this.realizandoAccion=true;
     if (i != null){
       const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
         height: '17em',
         width: '32em',
         data: { item: "Va a eliminarse de forma definitiva.\n¿Continuar?" }
       });
       dialogRef.afterClosed().subscribe( res => {
         if(res){
           this._itemService.eliminarItem(a,i,-1).then( res=>{
             if(typeof res != "string"){
               if(a==1){ this.actividades.splice(index,1); }
               else if(a==3){
                 let r = res as ContratoInterface;
                 this.contratos.splice(index,1);
                 this.archivoPDF.splice(index,1);
                 this.nombrePDF.getValue().splice(index,1);
                 this.tareasPropuestas.next(this.tareasPropuestas.getValue()-1);
                 if(+r.terminado == 1){
                   this.contratosTerminados.next(this.contratosTerminados.getValue()-1);
                 }
               }
               else if(a==2){
                 let r = res as TareasInterface;
                 this.tareas.splice(index,1);
                 this.tareaBloqueada.splice(index,1);
                 this.tareasPropuestas.next(this.tareasPropuestas.getValue()-1);
                 if(+r.finalizado == 1){
                   this.tareasTerminadas.next(this.tareasTerminadas.getValue()-1);
                 }
                 this.editarAvanceExp();
                 this.calcularAvance();
               }
               this.alertaOk("Eliminado correctamente.");
             }
             else this.alertaNoOk("Error inesperado durante la eliminación.");
           });
         }
         else{
           this.realizandoAccion = false;
         }
       });
     }
     else{
       if(a==1){
         this.actividades.splice(index,1);
       }
       else if(a==3){
         this.contratos.splice(index,1);
         this.archivoPDF.splice(index,1);
         this.nombrePDF.getValue().splice(index,1);
       }
       else if(a==2){
         this.tareas.splice(index,1);
         this.tareaBloqueada.splice(index,1);
         this.tareasPropuestas.next(this.tareasPropuestas.getValue()-1);
         this.calcularAvance();
       }
       this.realizandoAccion=false;
     }
   }


   crearModificarActConTar(i,a,index){
     this.realizandoAccion = true;
     if(i == 2){
       if(a.finalizado == 1 && this.tareaBloqueada[index] == false){
         const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
           height: '17em',
           width: '32em',
           data: { item: "Una vez se marque la tarea como finalizada no se podrá volver a editar.\n¿Continuar?" }
         });
         dialogRef.afterClosed().subscribe( res => {
           if(res){
             var currentdate = new Date();
             var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)  + "-" + currentdate.getDate() + " "
                          + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
             a.fecha_finalizacion = datetime;
             this.crearModificar(i,a,index);
           }
           else{
             this.realizandoAccion = false;
           }
         });
       }
       else this.crearModificar(i,a,index);
     }
     else this.crearModificar(i,a,index);
   }

   crearModificar(i,a,index){
     if(a.identificador != null ){
       console.log(a);
       this._itemService.actualizarItem(i,a.identificador,a,-1)
         .then( res=> {
           if(typeof res != "string"){
             if(i==1){
               this.alertaOk("Actividad actualizada correctamente.");
             }
             else if(i==3){
               if(a.terminado == 1){
                 this.contratosTerminados.next(this.contratosTerminados.getValue()+1);
               }
               this.calcularAvance();
               this.editarAvanceExp();
               if(this.archivoPDF[index]){
                 this._itemService.subirFilePdf(3,a.identificador,this.archivoPDF[index])
                   .then( res=>{
                     if(typeof res != "string"){
                       this.contratos[index].fichero = (res as any).fichero;
                       this.archivoPDF[index] = undefined;
                       this.nombrePDF.getValue()[index] = "";
                       this.alertaOk("Contrato creado correctamente.");
                     }
                     else this.alertaNoOk("Se ha producido un error inesperado subiendo el archivo.");
                   })
               }
               else this.alertaOk("Contrato actualizado correctamente.");
             }
             else if(i==2){
               if(a.finalizado == 1 && this.tareaBloqueada[index] == false){
                 this.tareaBloqueada[index] = true;
                 this.tareasTerminadas.next(this.tareasTerminadas.getValue()+1);
               }
               this.calcularAvance();
               this.editarAvanceExp();
               this.alertaOk("Tarea actualizada correctamente.");
             }
           }
           else this.alertaNoOk("Error inesperado durante la actualización.");
         })
     }
     else{
       this._itemService.crearItem(i,a)
         .then( res=> {
           if(typeof res != "string"){
             if(i==1){
               this.actividades[index] = res as ActividadInterface;
               this.alertaOk("Actividad creada correctamente.");
             }
             else if(i==3){
               this.contratos[index] = res as ContratoInterface;
               if(a.terminado == 1){
                 this.contratosTerminados.next(this.contratosTerminados.getValue()+1);
               }
               this.calcularAvance();
               this.editarAvanceExp();
               if(this.archivoPDF[index]){
                 this._itemService.subirFilePdf(3,this.contratos[index].identificador,this.archivoPDF[index])
                   .then( res=>{
                     if(typeof res != "string"){
                       this.contratos[index].fichero = (res as any).fichero;
                       this.archivoPDF[index] = undefined;
                       this.nombrePDF.getValue()[index] = "";
                       this.alertaOk("Contrato creado correctamente.");
                     }
                     else this.alertaNoOk("Se ha producido un error inesperado subiendo el archivo.");
                   })
               }
               else this.alertaOk("Contrato creado correctamente.");
             }
             else if(i==2){
               this.tareas[index] = res as TareasInterface;
               if(a.finalizado == 1 && this.tareaBloqueada[index] == false){
                 this.tareaBloqueada[index] = true;
                 this.tareasTerminadas.next(this.tareasTerminadas.getValue()+1);
               }
               this.calcularAvance();
               this.editarAvanceExp();
               this.alertaOk("Tarea creada correctamente.");
             }
           }
           else this.alertaNoOk("Error inesperado durante la inserción.");
         })
     }
   }

   verCartera(){
     this.router.navigate(['/cartera', this.cartera.identificador]);
   }

   cargarImg(files: FileList){
     if(files){
       this.imgInsertada = true;
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
   }

   //Prueba, luego hacer un array de files, etc
   cargarPDF(files: FileList, i){
      if(files && files.item(0)){
        this.archivoPDF[i] = files.item(0);
        var nom = this.nombrePDF;
        var r = new FileReader();
        r.onload = function(e){
          nom.getValue()[i] = files[0].name;
        }
        r.readAsDataURL(files[0]);
      }
      else{
        this.archivoPDF[i] = null;
        this.nombrePDF.getValue()[i] = "";
      }
   }

   verFicheroContrato(fichero){
     const dialogRef = this.dialog.open(VentanaEmergentePdfComponent,{
       height: '95%',
       width: '95%',
       data: { item: fichero }
     });
   }

   interpretarAvance(i){
     //Dado que es un float, para poder guardar tanto tareas como contratos por separado:
     //  tareas.contratos --> ejemplo: 23.23 (2/3 tareas . 2/3 contratos)
     //  el primer numero de cada parte indica las realizadas, el segundo las propuestas
     // con mas de 9 tareas o contratos fallara
     if(i){
       var num = i.split('.');
       if(num){
         if(num.length == 2){
           if(num[0].length == 1){
             this.tareasPropuestas.next(+num[0].charAt(0));
           }
           else if(num[0].length == 2){
             this.tareasTerminadas.next(+num[0].charAt(0));
             this.tareasPropuestas.next(+num[0].charAt(1));
           }
           if(num[1].length == 2){
             this.contratosTerminados.next(+num[1].charAt(0));
             this.contratosPropuestos.next(+num[1].charAt(1));
           }
         }
         else if(num.length == 1){
           if(num[0].length == 1){
             this.tareasPropuestas.next(+num[0].charAt(0));
           }
           else if(num[0].length == 2){
             this.tareasTerminadas.next(+num[0].charAt(0));
             this.tareasPropuestas.next(+num[0].charAt(1));
           }
         }
         this.calcularAvance();
       }
     }
   }

   calcularAvance(){
     this.porcentajeAvanzado.next( +( (this.tareasTerminadas.getValue() + this.contratosTerminados.getValue()) / (this.tareasPropuestas.getValue() + this.contratosPropuestos.getValue()) * 100).toFixed(1) );
     if(this.porcentajeAvanzado.getValue() == 100) this.colorSpinner.next("primary");
     else if(this.porcentajeAvanzado.getValue() >= 50) this.colorSpinner.next("accent");
     else this.colorSpinner.next("warn");
   }

   tieneCambios(){
     return this.imgInsertada || this.formulario.form.dirty || this.formularios.form.dirty;
   }

}
