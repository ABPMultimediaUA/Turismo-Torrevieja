import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Evento }  from "../../interfaces/evento.interface";
import { AlertService, AuthenticationService, EventosService, LogueadoService } from '../../services/index';
@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html'
})
export class ExpedienteComponent implements OnInit {
errorEvento = false;
rgstrEvento = false;
permisoEditar = false;
errorEventoActualizar = false;
//TituloNuevo = "";
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
id:string;




constructor( private _eventosService: EventosService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
              ) {
              this.logueadoService.comprobarLogueado();

          this.route.params.subscribe(parametros=>{
                console.log(parametros);
                this.id = parametros['id']

                //
                // if(this.id == "nuevo"){
                //   //insertando
                //   this.TituloNuevo="Nuevo ";
                //   console.log("nuevo usuario");
                //
                //
                // }else{
                // actualizando

                this._eventosService.getEvento(this.id)
                    .subscribe( evento => {evento.data.password="",   this.evento = evento.data, console.log(evento)})
                    console.log("pone password vacio");
              // }
          });
  }

  ngOnInit() {
  }



  guardar()

  {
        console.log("ewfefe"+this.id);
        if(this.id == "nuevo"){
          console.log("voy a guardar nueva evento(abajo):");
            console.log(this.evento);
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



          //insertando
          // this._usuariosService.nuevoUsuario(this.usuario)
          //     .subscribe(data=>{
          //         this.router.navigate(['/usuario',data.name])
          //     },
          //     error=>console.error(error));
        }else{

        //actualizando
        console.log("voy a actualizar usuario");
        this._eventosService.actualizarEvento(this.evento, this.id)
            .subscribe(data=>{
              console.log("data que queremos actualizar"+data);
              this.errorEventoActualizar = false;
                this.router.navigate(['eventos']);
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
                  this.errorMensaje.push(mensaje.error.nombreEventoa[i]);
                }
              }
               if (typeof(mensaje.error.correo) != "undefined")
               {
                 for(let i=0;i<mensaje.error.correo.length;i++)
                 {
                   if(mensaje.error.correo[i]=="The correo must be a valid correo address.")//este ya esta traducido
                   {
                     this.errorMensaje.push("El correo debe ser un correo válido");
                   }
                   else{
                     this.errorMensaje.push(mensaje.error.correo[i]);//aqui guarda todos los errores de correo y los muestra
                   }

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


              this.errorEventoActualizar =true;
            },);



        //insertando
        // this._usuariosService.nuevoUsuario(this.usuario)
        //     .subscribe(data=>{
        //         this.router.navigate(['/usuario',data.name])
        //     },
        //     error=>console.error(error));
        }

    }

    puedeEditar(){
      console.log("1.puedeEditar? =",this.permisoEditar);
      this.permisoEditar = true;
      console.log("2.puedeEditar? =",this.permisoEditar);
      return this.permisoEditar;
    }

}
