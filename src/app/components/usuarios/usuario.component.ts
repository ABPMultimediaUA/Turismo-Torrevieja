import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioInterface }  from "../../interfaces/usuario.interface";
import { AlertService  } from '../../services/index';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {
errorUsuario = false;
rgstrUsuario = false;
errorUsuarioActualizar = false;
//TituloNuevo = "";
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
vengoDe2:string = "";
nuevo:boolean = false;
id:string;




constructor(
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
              ) {
              this.vengoDe2= localStorage.vengoDe;
              console.log("vengoDe==", localStorage.vengoDe);
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

                // this._usuariosService.getUsuario(this.id)
                //     .subscribe( usuario => {usuario.data.password="",   this.usuario = usuario.data, console.log(usuario)})
                //     console.log("pone password vacio");
              // }
          });
  }

  ngOnInit() {
  }



  guardar()

  {
        console.log("ewfefe"+this.id);
        if(this.id == "nuevo"){
          console.log("voy a guardar nuevo usuario(abajo):");
            console.log(this.usuario);
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



          //insertando
          // this._usuariosService.nuevoUsuario(this.usuario)
          //     .subscribe(data=>{
          //         this.router.navigate(['/usuario',data.name])
          //     },
          //     error=>console.error(error));
        }else{

        //actualizando
        console.log("voy a actualizar usuario");
        // this._usuariosService.actualizarUsuario(this.usuario, this.id)
        //     .subscribe(data=>{
        //       console.log("data que queremos actualizar"+data);
        //       this.errorUsuarioActualizar = false;
        //         this.router.navigate(['usuarios']);
        //     },
        //     error=> {
        //     },);



        //insertando
        // this._usuariosService.nuevoUsuario(this.usuario)
        //     .subscribe(data=>{
        //         this.router.navigate(['/usuario',data.name])
        //     },
        //     error=>console.error(error));
        }
      if(localStorage.vengoDe="perfil"){

        console.log("hellocaramelloooooo")
        this.router.navigate(['/perfil']);
        this.router.navigate(['perfil']);
        console.log("hellocaramelloooooo2222222222222222222")
        delete localStorage.vengoDe;
        location.reload(true);
      }

    }
  vaciarVengoDe(){
    delete localStorage.vengoDe;
  }
  vaciarVengoDeYActualizarCosas(){

    // localStorage.setItem("identificador", this.usuario.identificador);
    localStorage.setItem("nombreUsuario", this.usuario.nombreUsuario);
    localStorage.setItem("apodo", this.usuario.apodo);
    localStorage.setItem("correo", this.usuario.correo);
    localStorage.setItem("vengoDe", "modificarUsuario");
  localStorage.setItem("mecagoEnDios", "mucho");
  }
}
