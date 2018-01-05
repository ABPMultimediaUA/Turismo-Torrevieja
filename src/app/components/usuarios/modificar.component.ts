import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

import { NgForm }  from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario }  from "../../interfaces/usuario.interface";

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html'
})
export class ModificarComponent implements OnInit {

  usuario:any={};
  iduser:string;

  constructor(  private activatedRoute:ActivatedRoute,private _usuariosService:UsuariosService
                ,private router:Router) {
    this.activatedRoute.params.subscribe( params=>{ this.usuario=this._usuariosService.getUsuario(params['id']);
    console.log(this.usuario);
    this.iduser=params['id'];
   });

  }

  ngOnInit() {
  }

  modificar(){
    console.log(this.usuario);

    this._usuariosService.modificarUsuario( this.usuario, this.iduser )
    .subscribe( data=>{
      //console.log(data);
    //  this.router.navigate(['/heroe',data.nombre])
  })
    //error=> console.error(error));


  }

}
