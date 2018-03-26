import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ExpedienteInterfaz }  from "../../interfaces/expediente.interface";
import { Usuario }  from "../../interfaces/usuario.interface";
import { Cartera }  from "../../interfaces/cartera.interface";
import { AlertService, AuthenticationService, PeticionesCrudService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-nuevo-expediente',
  templateUrl: './nuevo-expediente.component.html'
})
export class NuevoExpedienteComponent implements OnInit {

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

  public users:Usuario[];
  public cartera:Cartera[];

  @ViewChild("etiquetaImgExp") etiqueta;
  archivoImg:File = null;

  constructor( private _crudService: PeticionesCrudService,
                  private router:Router,
                  private route:ActivatedRoute,//esto es para pasar como parametro
                  public  logueadoService: LogueadoService
                )
    {
      this.logueadoService.comprobarLogueado();
      // this.evento.usuario= localStorage.identificador;

      //COGEMOS LOS USUARIOS
      this._crudService.getItem(5,-1,-1,-1).then(
        res => {
          //TODO Cambiar select para recoger solamente los usuarios que
          //tengan permiso para "coordinar" un evento
          this.users = res as Usuario[];
        }
      );

      //COGEMOS LAS CARTERAS CUYO ESTADO PERMITEN ANYADIR NUEVOS EXPEDIENTES (1 y 2)
      this._crudService.getItem(301,-1,-1,-1).then(
        res => {
          this.cartera = res as Cartera[];
          //TODO Eliminar cuando se arregle la select
          this._crudService.getItem(302,-1,-1,-1).then(
            res => {
              this.cartera = this.cartera.concat(res as Cartera[]);
            }
          );
        }
      );

    }

    ngOnInit() {
    }

    guardar(){
      var expBody = this.expediente;
      delete expBody.image;
      this._crudService.crearItem(0,expBody)
      .then( res=> {
        // if(this.archivoImg){ //ACTUALIZAMOS IMG
        //   this._crudService.subirFile(0,this.id,this.archivoImg)
        //     .then( res=>{ alert("Actualizado correctamente."); console.log(res);})
        //     .catch( (er) => { alert("Expediente actualizado correctamente, a excepción de la imagen.");
        //                       console.log( er.toString()) })
        // }
        // else{
           alert("Creado correctamente.");
           this.borrarFormExp();

        // }
      })
      .catch( (err) => { alert("Error interno, no pudo crearse el expediente.");
                         console.log( err.toString()) })
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

    borrarFormExp(){
      this.expediente={
        identificador:null,
        avance:0,
        cartera:0,
        coordinador:0,
        detalle:"",
        fechaFin:null,
        fechaInicio:null,
        image:"",
        nombreExpediente:"",
        titulo:"",
      }
    }

}
