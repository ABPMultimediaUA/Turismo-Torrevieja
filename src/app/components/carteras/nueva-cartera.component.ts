import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Usuario }  from "../../interfaces/usuario.interface";
import { AlertService, AuthenticationService, UsuariosService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-usuario',
  templateUrl: './nueva-cartera.component.html'
})
export class NuevaCarteraComponent implements OnInit {
errorUsuario = false;
rgstrUsuario = false;
errorUsuarioActualizar = false;
errorMensaje:string[]=[];
public usuario:Usuario={
  identificador:"",
  nombreUsuario:"",
  apodo:"",
  correo:"",
  password:"",
  password_confirmation:"",
  esVerificado:0,
  //key$?:string; identificador es la key
  rol:0
};

nuevo:boolean = false;
//id:string;

//


constructor( private _usuariosService: UsuariosService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
              ) {
                this.logueadoService.comprobarLogueado();

          this.route.params.subscribe(parametros=>{
                console.log(parametros);
                //this.id = parametros['id']
                // if(this.id !== "nuevo"){

                  // this._usuariosService.getUsuario(this.id)
                  //     .subscribe( usuario => { this.usuario = usuario.data, console.log(usuario)})
                // }

                // if(this.id == "nuevo"){
                //   //insertando
                // }else{
                // //actualizando
                // }
          });
  }

  ngOnInit() {
  }



  guardar()

  {
        //console.log("ewfefe"+this.id);
        //if(this.id == "nuevo"){
          console.log(this.usuario);
          console.log("hola");
            this._usuariosService.nuevoUsuario( this.usuario )
              .subscribe( data=>{
                //this.router.navigate(['/heroe',data.name])
                console.log(data);
                this.errorUsuario = false;
                this.rgstrUsuario = true;
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





                if (typeof(mensaje.error.nombreUsuario) != "undefined")
                {
                  for(let i=0;i<mensaje.error.nombreUsuario.length;i++)
                  {
                    this.errorMensaje.push(mensaje.error.nombreUsuario[i]);
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

                this.errorUsuario = true;
                this.rgstrUsuario = false;
              },);



          //insertando
          // this._usuariosService.nuevoUsuario(this.usuario)
          //     .subscribe(data=>{
          //         this.router.navigate(['/usuario',data.name])
          //     },
          //     error=>console.error(error));
        // }else{
        // //actualizando
        // this._usuariosService.actualizarUsuario(this.usuario, this.id)
        //     .subscribe(data=>{
        //       console.log("data que queremos actualizar"+data);
        //       this.errorUsuarioActualizar = false;
        //         this.router.navigate(['usuarios']);
        //     },
        //     error=> {
        //       //this.router.navigate(['/heroe',data.name])
        //       //console.log(error);
        //       let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
        //       console.log(mensaje.error);
        //
        //       this.errorMensaje=[];
        //
        //                   if(mensaje.error=="No posee permisos para ejecutar esta acción")
        //                   {
        //                     this.errorMensaje.push("No posee permisos para ejecutar esta acción");
        //                   }
        //
        //                   if(mensaje.error=="No estás verificado")
        //                   {
        //                     this.errorMensaje.push("No estás verificado");
        //                   }
        //
        //
        //
        //
        //
        //       if (typeof(mensaje.error.nombreUsuario) != "undefined")
        //       {
        //         for(let i=0;i<mensaje.error.nombreUsuario.length;i++)
        //         {
        //           this.errorMensaje.push(mensaje.error.nombreUsuario[i]);
        //         }
        //       }
        //        if (typeof(mensaje.error.correo) != "undefined")
        //        {
        //          for(let i=0;i<mensaje.error.correo.length;i++)
        //          {
        //            if(mensaje.error.correo[i]=="The correo must be a valid correo address.")//este ya esta traducido
        //            {
        //              this.errorMensaje.push("El correo debe ser un correo válido");
        //            }
        //            else{
        //              this.errorMensaje.push(mensaje.error.correo[i]);//aqui guarda todos los errores de correo y los muestra
        //            }
        //
        //          }
        //        }
        //        if (typeof(mensaje.error.apodo) != "undefined")
        //        {
        //          for(let i=0;i<mensaje.error.apodo.length;i++)
        //          {
        //            this.errorMensaje.push(mensaje.error.apodo[i]);
        //          }
        //        }
        //        if (typeof(mensaje.error.password) != "undefined")
        //        {
        //          for(let i=0;i<mensaje.error.password.length;i++)
        //          {
        //            this.errorMensaje.push(mensaje.error.password[i]);
        //          }
        //        }
        //
        //       console.log(this.errorMensaje);
        //
        //
        //
        //       /*
        //       for(let i=0; i<mensaje.error.length;i++)
        //       {
        //         console.log("Entrar2");
        //         console.log(mensaje.error[i]);
        //       }
        //       */
        //
        //
        //       this.errorUsuarioActualizar =true;
        //     },);
        //
        //
        //
        // //insertando
        // // this._usuariosService.nuevoUsuario(this.usuario)
        // //     .subscribe(data=>{
        // //         this.router.navigate(['/usuario',data.name])
        // //     },
        // //     error=>console.error(error));
        // }

    }

}
