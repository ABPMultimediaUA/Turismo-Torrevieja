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

  usuario:Usuario={
    nombreUsuario:"",
    apodo:"",
    password:"",
    password_confirmation:"",
    correo:""
  }

  constructor(private _usuariosService: UsuariosService,
              private router:Router) { }

  ngOnInit() {
  }
  guardar()
  {
    console.log(this.usuario);
    this._usuariosService.nuevoHeroe( this.usuario )
    .subscribe( data=>{
      console.log(data);
    //  this.router.navigate(['/heroe',data.nombre])
    },
    error=> console.error(error));


  }

}
