import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

import { NgForm }  from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario }  from "../../interfaces/usuario.interface";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {


  usuario:any={};

  constructor(  private activatedRoute:ActivatedRoute,private _usuariosService:UsuariosService) {
    this.activatedRoute.params.subscribe( params=>{ this.usuario=this._usuariosService.getUsuario(params['id']);
    console.log(this.usuario);
   });

  }

  ngOnInit() {
  }

}
