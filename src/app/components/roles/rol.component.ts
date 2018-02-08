import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Roles }  from "../../interfaces/roles.interface";
import { AlertService, AuthenticationService, RolesService, LogueadoService } from '../../services/index';
@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html'
})
export class RolComponent implements OnInit {
  errorRol = false;
  rgstrRol = false;
  errorRolActualizar = false;

  nuevo:boolean = false;
  id:string;

  errorMensaje:string[]=[];

  public rol:Roles={
    identificador:"",
    nombreRol:"",
    fechaCreacion:null,
    fechaActualizacion:null,
    fechaEliminacion:null,
  };

constructor( private _rolService: RolesService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
              ) {
              this.logueadoService.comprobarLogueado();

          this.route.params.subscribe(parametros=>{
                console.log(parametros);
                this.id = parametros['id']

                this._rolService.getRol(this.id)
                    .subscribe( rol => {rol.data.password="",   this.rol = rol.data, console.log(rol)})

          });
  }

  ngOnInit() {
  }



  guardar()

  {
        console.log("ewfefe"+this.id);
        if(this.id == "nuevo"){
          console.log("voy a guardar nuevo rol(abajo):");
            console.log(this.rol);
            this._rolService.nuevoRol( this.rol )
              .subscribe( data=>{
                //this.router.navigate(['/heroe',data.name])
                console.log(data);
                this.errorRol = false;
                this.rgstrRol = true;
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





                if (typeof(mensaje.error.nombreRol) != "undefined")
                {
                  for(let i=0;i<mensaje.error.nombreRol.length;i++)
                  {
                    this.errorMensaje.push(mensaje.error.nombreRol[i]);
                  }
                }
                console.log(this.errorMensaje);

                this.errorRol = true;
                this.rgstrRol = false;
              },);

        }else{

        //actualizando
        console.log("voy a actualizar rol");
        this._rolService.actualizarRol(this.rol, this.id)
            .subscribe(data=>{
              console.log("data que queremos actualizar"+data);
              this.errorRolActualizar = false;
                this.router.navigate(['rol']);
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





              if (typeof(mensaje.error.nombreRol) != "undefined")
              {
                for(let i=0;i<mensaje.error.nombreRol.length;i++)
                {
                  this.errorMensaje.push(mensaje.error.nombreRol[i]);
                }
              }

              console.log(this.errorMensaje);

              this.errorRolActualizar =true;
            },);

        }

    }

}
