import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioInterface }  from "../../interfaces/usuario.interface";
import { AlertService } from '../../services/index';

@Component({
  selector: 'app-usuario',
  templateUrl: './nuevo-usuario.component.html'
})
export class NuevoUsuarioComponent implements OnInit {
errorUsuario = false;
rgstrUsuario = false;
errorUsuarioActualizar = false;
errorMensaje:string[]=[];
public usuario:UsuarioInterface={
  identificador:-1,
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


constructor(
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
              ) {

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
            // this._usuariosService.nuevoUsuario( this.usuario )
            //   .subscribe( data=>{
            //     //this.router.navigate(['/heroe',data.name])
            //     console.log(data);
            //     this.errorUsuario = false;
            //     this.rgstrUsuario = true;
            // //    this.ngForm.reset();
            //
            //
            //
            //   },
            //   error=> {
            //   },);


    }

}
