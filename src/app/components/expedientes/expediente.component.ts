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

import { PostFacebook } from "../../interfaces/postFacebook.interface";
import { Http, Headers,ResponseContentType } from "@angular/http";
import { HttpClientModule ,HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['../../app.component.css','./expedientes.component.css']
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
  expedientePubli:ExpedienteInterface={
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
  contratoBloqueado:boolean[]=[];
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
  actividadesPropuestas = new BehaviorSubject<number>(0);
  colorSpinner = new BehaviorSubject<string>("warn");

  archivoImg:File = null;             //guardar el archivo para mandarlo en la peticion
  archivoPDF:File[] = [];             //guardar el archivo para mandarlo en la peticion
  imgInsertada:boolean = false;        //Activa el boton de actualizar exp si se inserta una imagen
  nombrePDF = new BehaviorSubject<string[]>([]);

  //PUBLICAR
  URL = "https://graph.facebook.com/";
  // paginas: PaginasInterface[] = [];
  page_name: string = "Cultura Torrevieja";
  page_id: string;
  user_id: string = "";
  user_access_token: string = "";
  page_access_token: string = "";
  imagenPub: File;
  public post: PostFacebook = {
    message: ""
  };
  uploadedImage: Blob;

  @ViewChild("etiquetaImgPub") etiquetaPub;

  @ViewChild("etiquetaImgExp") etiqueta;  //La etiqueta html img
  @ViewChild("formulario") formulario;
  @ViewChild("forma") formularios;
  @ViewChild("imgInput") imgInput : any;



  //PUBLICAR WORDPRESS -------------------------

  coordinador:number;
  idWP:number;

  @ViewChild("etiquetaImgExp") etiqueta2;

    public expedient:ExpedienteInterface={
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

    public expediente2:ExpedienteInterface={
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


    host:any = 'https://gvent.ovh/turismo-torrevieja/?rest_route=/wp/v2/posts&_embed';
    //host:any = 'http://127.0.0.1:8080/x3/?rest_route=/wp/v2/posts';
    data:any[] = [];

    header = new Headers ({
      'Content-Type':'application/json',
      'Authorization': 'Basic d3BUb3JyZXZpZWphOmFyQCY3OEdsNyleRUlSM2prKkxIcXR1VQ==',
    //  'Authorization': 'Basic amF2aXgzOkVheHlXSChIWERsJnJ0WG03T0tRZFRNNA==',
      // 'X-RequestDigest':'requestDigest',
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'ET, POST, PATCH, PUT, DELETE, OPTIONS',
       'Access-Control-Allow-Credentials':'true',
    //   'Access-Control-Allow-Headers': 'Authorization, Content-Type,accept, origin, X-Requested-With, X-Authentication',
       'Access-Control-Allow-Headers': '*',
       'Access-Control-Expose-Headers': 'X-WP-Total, X-WP-TotalPages',
       'Status':'publish'
    //   'Access-Control-Max-Age': '1728000'

    });


  constructor(
    private _itemService: PeticionesCrudService,
    public _authService:AuthService,
    private route:ActivatedRoute,
    public dialog: MatDialog,
    private router:Router,
    private http:Http,
    private httpclient:HttpClient
  ) {    
    this._authService.tienePermiso(27);
    this.route.params.subscribe( param => {
      this.id = param['id'];
      this._itemService.getItem(0,param.id,-1,-1,-1,"","").then( res => {
        if(typeof res != "string"){
          let r = res as any;
          this.expediente = r.data as ExpedienteInterface;
          this.expedienteSinModif = Object.assign({}, r.data as ExpedienteInterface);
          this.expFechaCreacion = r.data.fechaCreacion.split(' ')[0];
          this.interpretarAvance(this.expediente.avance);

          //creo el texto del post
          this.post.message = this.expediente.titulo;
          //aqui voy a hacer la llamada a otro evento donde tendre guardado el token y id de pagina
          this._itemService.getItem(0, 97, -1, -1, -1, "", "").then(res => {
            let r = res as any;
            this.expedientePubli = r.data as ExpedienteInterface;
            this.page_id = this.expedientePubli.titulo;
            this.user_access_token = this.expedientePubli.detalle;
          });

          //cargamos imagen
          if(this.expediente.image){
            this.expediente.image = "https://gvent.ovh/Prueba2_1/public/img/" + this.expediente.image;
            let o = this.etiqueta.nativeElement as HTMLImageElement;
            o.src = this.expediente.image;
            let p = this.etiquetaPub.nativeElement as HTMLImageElement;
            p.src = this.expediente.image;
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
                      this.actividadesPropuestas.next(this.actividades.length);
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
                        if(this.contratos[x].terminado == "1") {
                          this.contratoBloqueado.push(true);
                          this.contratos[x].auxTerminado = true;
                        }
                        else {
                          this.contratoBloqueado.push(false);
                          this.contratos[x].auxTerminado = false;
                        }
                      }
                    }
                });

                //COGEMOS LOS USUARIOS
                this._itemService.getItem(308,-1,-1,-1,-1,"","").then( res => {
                    if(typeof res != "string") {
                      let r = res as any;
                      this.users = r.data as UsuarioInterface[];
                    }
                });

                //COGEMOS LOS ESPACIOS
                this._itemService.getItem(310,-1,-1,-1,-1,"","").then( res => {
                    if(typeof res != "string") {
                      let r = res as any;
                      this.espacio = r.data as EspacioInterface[];
                    }
                });

                //COGEMOS LOS PROVEEDORES
                this._itemService.getItem(311,-1,-1,-1,-1,"","").then( res => {
                    if(typeof res != "string") {
                      let r = res as any;
                      this.proveedor = r.data as ProveedorInterface[];
                    }
                  });
              }
            }
          });
        }
      })
    })
//PUBLICAR WORDPRESS----------------------------
this.route.params.subscribe(parametros=>{
      this.idWP = parametros['id'];
      //COGEMOS EL EXPEDIENTE
      this._itemService.getItem(0,this.idWP,-1,-1,0,'','').then(res => {
          if(typeof res != "string"){
            let r = res as any;
            this.expediente2 = r.data as ExpedienteInterface;

          //  this.data[0]=this.expediente.titulo;
          //  this.data[1]=this.expediente.detalle;

          }
          //cargamos imagen
          if(this.expediente2.image){
            this.expediente2.image = "https://gvent.ovh/Prueba2_1/public/img/" + this.expediente2.image;
            let o = this.etiqueta2.nativeElement as HTMLImageElement;
            o.src = this.expediente2.image;
          }
          this.coordinador = +this.expediente2.coordinador;

          this.expedient=this.expediente2;

        });
console.log("WOEWOEWOWE");
console.log(this.expedient);
console.log("WOEWOEWOWE");
console.log(btoa('wpTorrevieja:ar@&78Gl7)^EIR3jk*LHqtuU'));
console.log("SEGUNDA ENCRIPTACION");
console.log(btoa('wpTorrevieja:ar@&78Gl7)^EIR3jk*LHqtuU'));
});







  }

  ngOnInit() {
  }

  enviarPostWP(){
    let promise = new Promise((resolve, reject) => {
      let url = this.host;
      console.log("1");
    //let body = JSON.stringify( this.expediente );
      let headers = this.header;
      let bodyAux={
        title:this.expedient.titulo,
        content:this.expedient.detalle,
        status:"publish",
        featured_media:"117"

      }
      console.log("2 "+headers);

      this.http.post(url, bodyAux , { headers: headers })
        .toPromise()
          .then(  (res) => { resolve( res.json().data ); },
                  (err) => { resolve( err.toString() )}
          )
      console.log("3");
      this.alertaOk("Evento publicado en Wordpress correctamente");
      this.cerrarPubliWp();
          // .catch((err) => { console.log(err.toString()); console.error(err); })
    });
    return promise;

  }

  //PUBLICAR EN FACEBOOK
  abrirPubliFace(){
  document.getElementById("fondoPubliFace").style.display="block";

  document.getElementById("publiFace").style.display="block";

  document.getElementById("publiFace").style.width=50+"%";

}
abrirPubliWp(){
document.getElementById("fondoPubliwp").style.display="block";

document.getElementById("publiwp").style.display="block";

document.getElementById("publiwp").style.width=50+"%";

}
cerrarPubliWp(){
  document.getElementById("fondoPubliwp").style.display="none";

document.getElementById("publiwp").style.display="none";
}
cerrarPubliFace(){
  document.getElementById("fondoPubliFace").style.display="none";

document.getElementById("publiFace").style.display="none";
}
    mostrarFoto($event): void {
      this.readThis($event.target);
    }
    readThis(inputValue: any): void {
      let foto = document.getElementById("foto");
      let inp = foto.childNodes[4];
      let img = document.getElementById("img");
      var file: File = inputValue.files[0];
      this.imagenPub = file;
      var myReader: FileReader = new FileReader();
      myReader.onloadend = function(e) {
        img.setAttribute('src', myReader.result);
        img.setAttribute('alt', file.name);
      }
      myReader.readAsDataURL(file);
    }

    publicar() {
      //si no han introducido una imagen nueva para la publicacion cojo la del evento
      if (this.imagenPub == undefined) {
        let url2 = this.expediente.image;
        this.http.get(url2, { responseType: ResponseContentType.Blob }).subscribe(response => {
          var  res = response.json();
          let file = new File([res], "caca.png", { type: "image/png", lastModified: 3924723894 });
          this.imagenPub=file;
          console.log(this.imagenPub);
        });
      }
      // y ahora hago el post a la pagina, primero cojo el token de la pagina
      let urlPage = this.URL + this.page_id + '?fields=access_token' + '&access_token=' + this.user_access_token;
      this.http.get(urlPage).subscribe(response => {
        let res = JSON.parse(response.text());
        this.page_id = res.id;
        this.page_access_token = res.access_token;
        //ahora que ya tengo el page token publico

        if (this.user_access_token != null) {
          let xhr = new XMLHttpRequest();
          let fd = new FormData();
          let url2 = this.URL + this.page_id + '/photos';
          xhr.open('POST', url2, true);
          fd.append("foto", this.imagenPub);
          fd.append("access_token", this.page_access_token);
          fd.append("caption", this.post.message);
          xhr.onload = function() {
            console.log(xhr.responseText);
            let res = JSON.parse(xhr.responseText);
          }
          xhr.send(fd);
        }
      });
      this.alertaOk("Evento publicado en facebook correctamente");
this.cerrarPubliFace();

    }


  modificarActividad(a:ActividadInterface){
    this._itemService.actualizarItem(1,a.identificador,a,-1).then( res=> {
      if(typeof res != "string") this.alertaOk("Actividad modificada correctamente.");
      else this.alertaNoOk("Error inesperado durante la modificación.");
    });
  }

  modificarContrato(c:ContratoInterface,i){
    if(c.auxTerminado) c.terminado = "1";
    else c.terminado = "0";
    if(c.terminado == "1" && this.contratoBloqueado[i] == false){
      const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
        height: '17em',
        width: '32em',
        data: { item: "Una vez se marque el contrato como finalizado no se podrá volver a editar.\n¿Continuar?" }
      });
      dialogRef.afterClosed().subscribe( res => {
        if(res) this.mContrato(c,i);
      });
    }
    else this.mContrato(c,i);
  }
  mContrato(c:ContratoInterface,i){
    this._itemService.actualizarItem(3,c.identificador,c,-1).then( res=> {
      if(typeof res != "string") {
        if(+c.terminado == 1 && this.contratoBloqueado[i] == false){
          this.contratoBloqueado[i] = true;
          this.cambiarAvance("ct",1,"",0);
        }
        if(this.archivoPDF[i]){
          this._itemService.subirFilePdf(3,c.identificador,this.archivoPDF[i])
            .then( res=>{
              if(typeof res != "string"){
                this.contratos[i].fichero = (res as any).fichero;
                this.archivoPDF[i] = undefined;
                this.nombrePDF.getValue()[i] = "";
                this.alertaOk("Contrato modificado correctamente.");
              }
              else this.alertaNoOk("Se ha producido un error inesperado subiendo el archivo.");
            })
        }
        else this.alertaOk("Contrato modificado correctamente.");
      }
      else this.alertaNoOk("Error inesperado durante la modificación.");
    });
  }

  modificarTarea(t:TareasInterface,i){
    if(+t.finalizado == 1 && this.tareaBloqueada[i] == false){
      const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
        height: '17em',
        width: '32em',
        data: { item: "Una vez se marque la tarea como finalizada no se podrá volver a editar.\n¿Continuar?" }
      });
      dialogRef.afterClosed().subscribe( res => {
        if(res) this.mTarea(t,i);
      });
    }
    else this.mTarea(t,i);
  }
  mTarea(t:TareasInterface,i){
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1)  + "-" + currentdate.getDate() + " "
                 + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    t.fecha_finalizacion = datetime;
    this._itemService.actualizarItem(2,t.identificador,t,-1).then( res=> {
      if(typeof res != "string") {
        if(+t.finalizado == 1 && this.tareaBloqueada[i] == false){
          this.tareaBloqueada[i] = true;
          this.cambiarAvance("tt",1,"",0);
        }
        this.alertaOk("Tarea modificada correctamente.");
      }
      else this.alertaNoOk("Error inesperado durante la modificación.");
    });
  }

  eliminarExpediente(){
    const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
      height: '17em',
      width: '32em',
      data: { item: "Va a eliminarse de forma definitiva.\n¿Continuar?" }
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res) {
        this.realizandoAccion=true;
        this._itemService.eliminarItem(0,this.expediente.identificador,-1).then( res=>{
          if(typeof res != "string"){
            this.alertaOkElimEx("Eliminado correctamente.");
          }
          else this.alertaNoOk("Error inesperado durante la eliminación.");
        });
      }
    });
  }

  alertaOkElimEx(sms){
    let icono:number = 0;
    const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
      height: '17em',
      width: '32em',
      data: { item: sms, item2: icono }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.bloqCampos = true;
      this.realizandoAccion = false;
      this.router.navigate(['entrada']);
    });
  }

   eliminarItem(a, i, index){
     const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
       height: '17em',
       width: '32em',
       data: { item: "Va a eliminarse de forma definitiva.\n¿Continuar?" }
     });
     dialogRef.afterClosed().subscribe( res => {
       if(res){
         this.realizandoAccion=true;
         this.eliminar(a, i, index);
       }
     });
   }
   eliminar(a, i, index){
     this._itemService.eliminarItem(a,i,-1).then( res=>{
       if(typeof res != "string"){
         if(a==1){
           this.actividadesPropuestas.next(this.actividadesPropuestas.getValue()-1);
           this.actividades.splice(index,1);
         }
         else if(a==3){
           let r = res as ContratoInterface;
           this.contratos.splice(index,1);
           this.contratoBloqueado.splice(index,1);
           this.archivoPDF.splice(index,1);
           this.nombrePDF.getValue().splice(index,1);
           if(+r.terminado == 1){ this.cambiarAvance("cp",-1,"ct",-1); }
           else{ this.cambiarAvance("cp",-1,"",0); }
         }
         else if(a==2){
           let r = res as TareasInterface;
           this.tareas.splice(index,1);
           this.tareaBloqueada.splice(index,1);
           if(+r.finalizado == 1){ this.cambiarAvance("tp",-1,"tt",-1); }
           else{ this.cambiarAvance("tp",-1,"",0); }
         }
         this.alertaOk("Eliminado correctamente.");
       }
       else this.alertaNoOk("Error inesperado durante la eliminación.");
     });
   }

   cambiarAvance(c1:string, i1:number, c2:string, i2:number){
     if(c1 == "ct") this.contratosTerminados.next(this.contratosTerminados.getValue()+i1);
     else if(c1 == "cp") this.contratosPropuestos.next(this.contratosPropuestos.getValue()+i1);
     else if(c1 == "tt") this.tareasTerminadas.next(this.contratosTerminados.getValue()+i1);
     else if(c1 == "tp") this.tareasPropuestas.next(this.contratosPropuestos.getValue()+i1);

     if(c2 == "ct") this.contratosTerminados.next(this.contratosTerminados.getValue()+i2);
     else if(c2 == "cp") this.contratosPropuestos.next(this.contratosPropuestos.getValue()+i2);
     else if(c2 == "tt") this.tareasTerminadas.next(this.contratosTerminados.getValue()+i2);
     else if(c2 == "tp") this.tareasPropuestas.next(this.contratosPropuestos.getValue()+i2);

     this.editarAvanceExp();
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
     this._itemService.actualizarItem(0,this.id,body,-1).then(
       res => {
         if(typeof res != 'string'){
           this.interpretarAvance((res as ExpedienteInterface).avance.toString());
         }
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

   //Bloquea y desbloquea los campos del form al pulsar los btn EDITAR o CANCELAR
   disable_enable_campos() {
     if(this.bloqCampos) this.bloqCampos = false;
     else {
       this.restaurarValores();
       this.bloqCampos = true;
     }
   }


     crearPlantillaAct(){
      var a:ActividadInterface;
      a={
        capacidadMinimo:null,
        capacidadMaximo:null,
        espacio:166,
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
      this._itemService.crearItem(1,a)
        .then( res=> {
          if(typeof res != "string"){
            a=res as ActividadInterface;
            this.actividadesPropuestas.next(this.actividadesPropuestas.getValue()+1);
            this.actividades.push(a);
          }
        })
     }

     crearPlantillaCon(){
      var c:ContratoInterface;
      c={
        activo:null,
        fichero:null,
        clase:"Presupuesto",
        expediente:+this.id,
        identificador:null,
        nombreContrato:"* Nuevo contrato",
        precio:0,
        proveedor:11,
        tiempo:null,
        usuario:24,
        observaciones:null,
        terminado:null,
        auxTerminado:false
      };
      this._itemService.crearItem(3,c)
        .then( res=> {
          if(typeof res != "string"){
            c=res as ContratoInterface;
            this.contratos.push(c);
            this.archivoPDF.push(null);
            this.nombrePDF.getValue().push("");
            this.contratoBloqueado.push(false);
            this.cambiarAvance("cp",1,"",0);
          }
        })
     }

     crearPlantillaTar(){
      var t:TareasInterface;
      t={
        expediente:+this.id,
        finalizado:null,
        identificador:null,
        nombreTarea:"* Nueva tarea",
        usuario:24,
        fechaCreacion:null,
        fecha_finalizacion:null,
      };
      this._itemService.crearItem(2,t)
        .then( res=> {
          if(typeof res != "string"){
            t=res as TareasInterface;
            this.tareas.push(t);
            this.tareaBloqueada.push(false);
            this.cambiarAvance("tp",1,"",0);
          }
        })
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
     .then( res=> {
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

   tieneCambios(){
     if(this.cartera.estado>1) return this.imgInsertada || this.formulario.form.dirty || this.formularios.form.dirty;
     else return this.imgInsertada || this.formulario.form.dirty;
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

   verCartera(){
     this.router.navigate(['/cartera', this.cartera.identificador]);
   }

}
