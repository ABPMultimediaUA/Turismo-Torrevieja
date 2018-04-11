import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Cartera }  from "../../interfaces/cartera.interface";
import { AlertService, CarterasService } from '../../services/index';

@Component({
  selector: 'app-nueva-cartera',
  templateUrl: './nueva-cartera.component.html'
})
export class NuevaCarteraComponent implements OnInit {
  errorCartera = false;
  rgstrCartera = false;
  permisoEditar = false;
  errorCarteraActualizar = false;
  //TituloNuevo = "";
  errorMensaje:string[]=[];
  public cartera:Cartera={
    identificador:"",
    nombreCartera:"",
    year:0,
    trimestre:0,
    estado:0,
    fechaCreacion:"",
    fechaActualizacion:"",
    fechaEliminacion:""
  };

nuevo:boolean = false;
//id:string;

//


constructor( private _carterasService: CarterasService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
              ) {

          this.route.params.subscribe(parametros=>{
                console.log(parametros);

          });
  }

  ngOnInit() {
  }



  guardar()

  {

          console.log(this.cartera);
          console.log("hola");
            this._carterasService.nuevaCartera( this.cartera )
              .subscribe( data=>{
                //this.router.navigate(['/heroe',data.name])
                console.log(data);
                this.errorCartera = false;
                this.rgstrCartera = true;
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





                if (typeof(mensaje.error.nombreCartera) != "undefined")
                {
                  for(let i=0;i<mensaje.error.nombreCartera.length;i++)
                  {
                    this.errorMensaje.push(mensaje.error.nombreCartera[i]);
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

                this.errorCartera = true;
                this.rgstrCartera = false;
              },);




    }

}
