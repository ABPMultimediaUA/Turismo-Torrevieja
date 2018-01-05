import { Component, OnInit } from '@angular/core';
import { Usuario }  from "../../interfaces/usuario.interface";
import { UsuariosService } from "../../services/usuarios.service";
import { NgForm }  from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  usuarios:any;

  constructor(private _usuariosService:UsuariosService, private router:Router) {

    this._usuariosService.peticionUsuarios()
        .subscribe( data =>{
          console.log(data);
          this.usuarios=data;
        } )

   }

  ngOnInit() {
    //this.usuarios=this._usuariosService.peticionUsuarios();
  }

//NO LA USO, USO EL ROUTER LINK
  verUsuario(index:number){
    this.router.navigate( ['/heroe', index,'/detalle']);
  }


  borrarUsuario(key:string){
    this._usuariosService.borrarUsuario(key)
        .subscribe( data=>{
          if(data){
            console.error(data);
          }
          else{ //todo bien
            delete this.usuarios[key];
          }
        })
  }

}
