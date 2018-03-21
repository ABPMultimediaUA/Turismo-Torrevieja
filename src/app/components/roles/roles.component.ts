import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from "../home/home.component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { HttpModule } from '@angular/http';
import { AlertService, AuthenticationService, PeticionesCrudService, LogueadoService } from '../../services/index';

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


  constructor(  private _rolesService: PeticionesCrudService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
                )
  {
    this.logueadoService.comprobarLogueado();
    this._rolesService.getItem(4,-1,-1,3)
    .then( data =>{ console.log(data);
      this.roles= data as any;
      this.totalPaginas = Math.ceil(this.roles.length/10);
      this.loading=false;

      for(let i=0;i<this.totalPaginas;i++){
        this.cantidadPagina.push(i);
      }

      if(this.roles.length>9){
        for(let i=0;i<=9;i++){
          this.rolesActuales.push(this.roles[i]);
        }
      }else{
        for(let i=0;i<this.roles.length;i++){
          this.rolesActuales.push(this.roles[i]);
        }
      }
    })
  }

  ngOnInit() {
  }

  nuevaPagina(pagina:number){
    this.currentPage=pagina;
    let x = 10 * (pagina-1);
    let y = x + 9;
    this.rolesActuales=[];

    if(pagina==this.totalPaginas){
      for(let i=x;i<this.roles.length;i++){
        this.rolesActuales.push(this.roles[i]);
      }
    }else{
      for(let i=x;i<=y;i++){
        this.rolesActuales.push(this.roles[i]);
      }
    }
  }

    borrarRol(id:string){
      this._rolesService.eliminarItem(4,id,-1)
      .then(respuesta=>{
        if(respuesta){
          this._rolesService.getItem(4,1,-1,-1);
          location.reload(true);
          this.router.navigate(['roles']);
          // this.refresh();
        }else{
          delete this.roles[id];
        }
      })
  }
}
