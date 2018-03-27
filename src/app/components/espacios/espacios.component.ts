import { Component, OnInit } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { EspacioInterface } from '../../interfaces/espacio.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['./espacios.component.css']
})

export class EspaciosComponent implements OnInit {

  item:EspacioInterface[]=[];
  itemsActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;
  loading:boolean = true;
  cantidadPagina:any[]=[];

  constructor(  private _ItemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                private router:Router
             )
  {
    this.logueadoService.comprobarLogueado();

    this._ItemService.getItem(6,-1,-1,-1).then(
      res => {
        this.item = res as EspacioInterface[];

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

  borrarItem(id:number){
    this._ItemService.eliminarItem(6,id,-1)
    .then( res =>{
      if(res){
        this._ItemService.getItem(6,1,-1,-1);
        location.reload(true);
        this.router.navigate(['espacios']);
      }
    })
  }

}
