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
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.css']
})
export class ExpedientesComponent implements OnInit {
  item:any[] = [];
  loading:boolean = true;
  //pagination
  paginacion:any = [];
  cantidadPagina:any[]=[];

  itemsActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;

  constructor(  private _ItemService: PeticionesCrudService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
              )
  {
    this.logueadoService.comprobarLogueado();
    this._ItemService.getItem(0,-1,-1,-1).then(
      res => {
        this.item = res as any;
        console.log("MOSTRAMOS EXPEDIENTES");
        console.log(this.item);
        this.totalPaginas = Math.ceil(this.item.length/10);
        this.loading=false;

        for(let i=0;i<this.totalPaginas;i++){ this.cantidadPagina.push(i); }

        if(this.item.length>9){
          for(let i=0;i<=9;i++){ this.itemsActuales.push(this.item[i]); }
        }
        else{
          for(let i=0;i<this.item.length;i++){ this.itemsActuales.push(this.item[i]); }
        }
      }
    );
  }

  ngOnInit() {
  }

  nuevaPagina(pagina:number){
    this.currentPage=pagina;
    let x = 10 * (pagina-1);
    let y = x + 9;
    this.itemsActuales=[];

    if(pagina==this.totalPaginas){
      for(let i=x;i<this.item.length;i++){
        this.itemsActuales.push(this.item[i]);
      }
    }else{
      for(let i=x;i<=y;i++){
        this.itemsActuales.push(this.item[i]);
      }
    }
  }

}
