import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from "../home/home.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { HttpModule } from '@angular/http';
import { AlertService, AuthenticationService, RolesService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roles:any[] = [];
  loading:boolean = true;
  //pagination
  paginacion:any = [];
  cantidadPagina:any[]=[];

  rolesActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;


  constructor(  private _rolesService: RolesService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
                )
  {
    this.logueadoService.comprobarLogueado();
    //console.log("estaLogueado:");
    //console.log(this.logueadoService.estaLogueado);
    this._rolesService.getRoles("1")
    .subscribe( data =>{
      //console.log(data);//la data del getHeroes

      this.roles= data.data;
      //console.log("array de roles:");
      // console.log(this.roles);
      // console.log("roles[3]:");
      // console.log(this.roles[3]);
      this.totalPaginas = Math.ceil(this.roles.length/10);
      // console.log("this.totalPaginas:");
      // console.log(this.totalPaginas);
      this.loading=false;

      for(let i=0;i<this.totalPaginas;i++)
      {
        this.cantidadPagina.push(i);
      }

      if(this.roles.length>9){
        for(let i=0;i<=9;i++)
        {
          this.rolesActuales.push(this.roles[i]);
        }
      }else{
        for(let i=0;i<this.roles.length;i++)
        {
          this.rolesActuales.push(this.roles[i]);
        }
      }
    })
  }

  ngOnInit() {
  }

  nuevaPagina(pagina:number){
    this.currentPage=pagina;
    console.log("pagina que pido:");
    console.log(pagina);
    let x = 10 * (pagina-1);
    let y = x + 9;
    this.rolesActuales=[];

    if(pagina==this.totalPaginas){
      for(let i=x;i<this.roles.length;i++)
      {
        this.rolesActuales.push(this.roles[i]);
      }
    }else{
      for(let i=x;i<=y;i++)
      {
        this.rolesActuales.push(this.roles[i]);
      }
    }
  }

    borrarRol(id:string){
      this._rolesService.borrarRoles(id)
      .subscribe(respuesta=>{
        if(respuesta){
          console.log("caracola");
          console.log(respuesta);
          console.log( "borra rol y ahora va a pedir todos los roles de nuevo" );
          this._rolesService.getRoles("1");
          console.log( "aqui los ha pedido ya todos de nuevo y voy a hacer el router navigate a usuarios" );
          location.reload(true);
          this.router.navigate(['roles']);
          // this.refresh();
        }else{
        //todo bien
          delete this.roles[id];

        }

    })

  }
}
