import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario }  from "../../interfaces/usuario.interface";
import { UsuariosService } from "../../services/usuarios.service";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {
errorUsuario = false;
rgstrUsuario = false;
errorMensaje:string[]=[];


  usuario:Usuario={
    nombreUsuario:"",
    apodo:"",
    password:"",
    password_confirmation:"",
    correo:""
  };



  constructor(private _usuariosService: UsuariosService,
              private router:Router) { }



  ngOnInit() {

  }



  guardar()
  {
      console.log(this.usuario);
        this._usuariosService.nuevoHeroe( this.usuario )
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
    }


}
