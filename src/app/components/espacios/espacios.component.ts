import { Component, OnInit, ViewChild } from '@angular/core';
import { PeticionesCrudService, LogueadoService } from '../../services/index';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { EliminarEspacioComponent } from './eliminar-espacio.component';
import { PaginacionInterface } from '../../interfaces/paginacion.interface';
import { EspacioInterface } from '../../interfaces/espacio.interface';
import { NuevoEspacioComponent } from './nuevo-espacio.component';

@Component({
  selector: 'app-espacios',
  templateUrl: './espacios.component.html',
  styleUrls: ['../../app.component.css','./espacios.component.css']
})

export class EspaciosComponent implements OnInit {

  items:EspacioInterface[]=[];
  option_Items_Pgn='10';
  selectUrl:number = 6; //Selecciona la url para las peticiones getItem
  busqueda = -1; //Si se ha rellenado el campo de busqueda
  selectASC_DESC:number=-1; //Saber si el usuario quiere ordenar los items: -1 nada seleccionado, 0 ASC, 1 DES
  valorEscogidoForOrder:number = -1; //Para saber el elemento seleccionado, -1 valor neutro
  paginacion:PaginacionInterface={
    count:0,
    current_page:1,
    links:{
      previous:null,
      next:null,
    },
    per_page:0,
    total:0,
    total_pages:1
  };
  row:EspacioInterface;
  @ViewChild("btnsPag") BtnsPagOff;

  dataSource = new MatTableDataSource(this.items);
  selection = new SelectionModel<EspacioInterface>(true, []);

  constructor(  private _itemService: PeticionesCrudService,
                public  logueadoService: LogueadoService,
                public dialog: MatDialog
             )
  {
    this.logueadoService.comprobarLogueado();
    this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);
  }

  ngOnInit() {
  }

  //Cargar items
  cargarItems(peticion:number, per_pgn:number, pgn:number){
    this.logueadoService.comprobarLogueado();

    this._itemService.getItem(peticion,this.busqueda,per_pgn,pgn).then(
      res => {
        console.log(res); //TODO Eliminar
        if(res && res["data"] && res["meta"]){
          this.items = res["data"] as EspacioInterface[];
          this.paginacion = res["meta"].pagination as PaginacionInterface;
          this.ngAfterViewInit();
          this.activarDesactvarBtnsPag();
        }
      });
  }

  //Cargar items en tabla
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.items);
    this.selection = new SelectionModel<EspacioInterface>(true, []);
  }

  //Marcar checkbox
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  //Marcar checkbox
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  //Buscador
  //TODO por hacer, da error
  realizarBusqueda(e){
    console.log("busqueda");
    console.log(e.target.value);
    if(e.target.value == "") this.busqueda = -1;
    if(e.keyCode == 13){
      this.selectUrl = 303;
      this.busqueda = e.target.value.toString();
      // this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);

      this._itemService.getItem(303,this.busqueda,-1,-1).then(
        res => {
          console.log(res);
        });
    }
  }

  //Habilita o deshabilita el boton eliminar lista de items
  activarEliminarMultiplesItems(i){
    var b1 = <HTMLInputElement> document.getElementById("btnEliminarItems");
    if(i.length>0) b1.disabled = false;
    else b1.disabled = true;
  }

  //Funcion eliminar item o items
  botonEliminarItem(i){
    console.log(i.length);
    if(i){
      const dialogRef = this.dialog.open(EliminarEspacioComponent,{
        height: '90%',
        width: '90%',
        data: { item: i }
      });
      dialogRef.afterClosed().subscribe( res => {
        if(res){
          var b1 = <HTMLInputElement> document.getElementById("btnEliminarItems");
          var pag:number;
          b1.disabled = true;
          if(i.length < this.paginacion.count) pag = this.paginacion.current_page;
          else if(i.length == this.paginacion.count && this.paginacion.current_page > 1) pag = this.paginacion.current_page - 1;
          else pag = 1;
          this.cargarItems(this.selectUrl,this.paginacion.per_page,pag)
        }
      });
    }
  }

  //Funcion abrir formulario crear / editar item
  editarAnyadirItem(row){
    const dialogRef = this.dialog.open(NuevoEspacioComponent,{
      height: '90%',
      width: '90%',
      data: { item: row }
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        var b1 = <HTMLInputElement> document.getElementById("btnEliminarItems");
        b1.disabled = true;
        this.cargarItems(this.selectUrl,this.paginacion.per_page,this.paginacion.current_page)
      }
    });
  }

  //Funcion que se llama cada vez que se cambia el numero de items por pgn
  actualizarPaginacion(){
    this.paginacion.per_page = +this.option_Items_Pgn;
    this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);
  }

  //Botones  para cambiar de pagina
  cambiarPgn(i:number){
    if(i == 1){
      if(this.paginacion.current_page != 1){
        this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);
      }
    }
    else if(i == 2){
      if(this.paginacion.current_page > 1){
        this.cargarItems(this.selectUrl,+this.option_Items_Pgn,this.paginacion.current_page-1);
      }
    }
    else if(i == 3){
      if(this.paginacion.current_page < this.paginacion.total_pages){
        this.cargarItems(this.selectUrl,+this.option_Items_Pgn,this.paginacion.current_page+1);
      }
    }
    else if(i == 4){
      if(this.paginacion.current_page != this.paginacion.total_pages){
        this.cargarItems(this.selectUrl,+this.option_Items_Pgn,this.paginacion.total_pages);
      }
    }
  }

  //Activa o desactiva los botones de paginacion
  activarDesactvarBtnsPag(){
    var div = this.BtnsPagOff.nativeElement.children;
    if(this.paginacion.current_page > 1){
      div[0].classList.remove('btnsPaginacionOff');
      div[1].classList.remove('btnsPaginacionOff');
    }
    else{
      div[0].classList.add('btnsPaginacionOff');
      div[1].classList.add('btnsPaginacionOff');
    }
    if(this.paginacion.current_page < this.paginacion.total_pages){
      div[2].classList.remove('btnsPaginacionOff');
      div[3].classList.remove('btnsPaginacionOff');
    }
    else{
      div[2].classList.add('btnsPaginacionOff');
      div[3].classList.add('btnsPaginacionOff');
    }
  }

  //Para hacer selects ORDER BY
  cambiarOrden(i:number){
    //Primero se comprueba que el parametro sea correcto, luego comprueba si se activa o desactiva y si es ASC o DES
    if(i>-1 && i<4){
      if(this.valorEscogidoForOrder != i) {
        this.valorEscogidoForOrder = i;
        this.selectASC_DESC = 0;
      }
      else if(this.selectASC_DESC == 0) this.selectASC_DESC = 1;
      else if(this.selectASC_DESC == 1){
        this.valorEscogidoForOrder = -1;
        this.selectASC_DESC = -1;
      }

      //TODO En cuanto esten hechas las select order by desbloquear
      //Una vez actualizado todo escoge la select correspondiente
      // switch(this.valorEscogidoForOrder){
      //   case -1:
      //     this.selectUrl = 6;
      //     break;
      //   case 0:
      //     if(this.selectASC_DESC == 0) this.selectUrl = null; //ID ASC
      //     else this.selectUrl = null; //ID DESC
      //     break;
      //   case 1:
      //     if(this.selectASC_DESC == 0) this.selectUrl = null; //Nombre ASC
      //     else this.selectUrl = null; //Nombre DESC
      //     break;
      //   case 2:
      //     if(this.selectASC_DESC == 0) this.selectUrl = null;
      //     else this.selectUrl = null;
      //     break;
      //   case 3:
      //     if(this.selectASC_DESC == 0) this.selectUrl = null;
      //     else this.selectUrl = null;
      //     break;
      // }
      // this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);
    }
  }

}
