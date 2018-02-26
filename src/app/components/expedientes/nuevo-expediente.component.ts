import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Expediente }  from "../../interfaces/expediente.interface";
import { Evento }  from "../../interfaces/evento.interface";

import { AlertService, AuthenticationService, EventosService, ExpedientesService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-nuevo-expediente',
  templateUrl: './nuevo-expediente.component.html'
})
export class NuevoExpedienteComponent implements OnInit {
errorEvento = false;
rgstrEvento = false;
errorEventoActualizar = false;
errorMensaje:string[]=[];
public evento:Evento={
  identificador:"",
  nombreEvento:"",
  usuario:"", //usuario que ha creado el evento
  fechaCreacion:"",
  fechaActualizacion:"",
  fechaEliminacion:""
};

nuevo:boolean = false;
//id:string;

//


constructor( private _eventosService: EventosService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
              ) {
                this.logueadoService.comprobarLogueado();
                this.evento.usuario= localStorage.identificador;
          this.route.params.subscribe(parametros=>{
                console.log(parametros);

          });
  }

  ngOnInit() {
  }



  guardar()

  {

          console.log(this.evento);
          console.log("hola");
            this._eventosService.nuevoEvento( this.evento )
              .subscribe( data=>{
                //this.router.navigate(['/heroe',data.name])
                console.log(data);
                this.errorEvento = false;
                this.rgstrEvento = true;
            //    this.ngForm.reset();



              },
              error=> {
                //this.router.navigate(['/heroe',data.name])
                //console.log(error);
                let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
                console.log(mensaje.error);

                this.errorMensaje=[];

                            if(mensaje.error=="No posee permisos para ejecutar esta acción")
                            {
                              this.errorMensaje.push("No posee permisos para ejecutar esta acción");
                            }

                            if(mensaje.error=="No estás verificado")
                            {
                              this.errorMensaje.push("No estás verificado");
                            }





                if (typeof(mensaje.error.nombreEvento) != "undefined")
                {
                  for(let i=0;i<mensaje.error.nombreEvento.length;i++)
                  {
                    this.errorMensaje.push(mensaje.error.nombreEvento[i]);
                  }
                }
                 if (typeof(mensaje.error.correo) != "undefined")
                 {
                   for(let i=0;i<mensaje.error.correo.length;i++)
                   {
                     this.errorMensaje.push(mensaje.error.correo[i]);
                   }
                 }
                 if (typeof(mensaje.error.apodo) != "undefined")
                 {
                   for(let i=0;i<mensaje.error.apodo.length;i++)
                   {
                     this.errorMensaje.push(mensaje.error.apodo[i]);
                   }
                 }
                 if (typeof(mensaje.error.password) != "undefined")
                 {
                   for(let i=0;i<mensaje.error.password.length;i++)
                   {
                     this.errorMensaje.push(mensaje.error.password[i]);
                   }
                 }

                console.log(this.errorMensaje);



                /*
                for(let i=0; i<mensaje.error.length;i++)
                {
                  console.log("Entrar2");
                  console.log(mensaje.error[i]);
                }
                */

                this.errorEvento = true;
                this.rgstrEvento = false;
              },);




    }

}
