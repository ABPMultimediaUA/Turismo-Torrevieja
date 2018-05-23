import { Component, OnInit, ViewChild }         from '@angular/core';
import { PeticionesCrudService, AuthService }   from '../../services/index';
import { SelectionModel }                       from '@angular/cdk/collections';
import { MatTableDataSource, MatDialog }        from '@angular/material';
import { PaginacionInterface }                  from '../../interfaces/paginacion.interface';
import { CarteraInterface }                     from '../../interfaces/cartera.interface';
import { ExpedienteInterface }                  from '../../interfaces/expediente.interface';
import { TareasInterface }                      from '../../interfaces/tareas.interface';
import { AvanceExpedienteInterface }            from '../../interfaces/avanceExpediente.interface';
import { Router, ActivatedRoute }               from "@angular/router";
import { VentanaEmergenteComponent }            from '../ventana-emergente/ventana-emergente.component'

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['../../app.component.css','./entrada.component.css']
})

export class EntradaComponent implements OnInit {

  items:ExpedienteInterface[]=[];
  avances:AvanceExpedienteInterface[]=[];
  items2:TareasInterface[]=[];
  row:ExpedienteInterface;
  row2:TareasInterface;
  carteras:CarteraInterface[]=[];
  expAux:ExpedienteInterface[]=[];
  exp:string[]=[];
  selectCartera:string[]=[];
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
  paginacion2:PaginacionInterface={
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
  btnEliminar:boolean = true;
  option_Items_Pgn='10';
  option_Items_Pgn2='10';
  selectUrl:number = 209;
  selectUrl2:number = 209;
  selectASC_DESC:number=-1;
  valorEscogidoForOrder:number = -1;
  @ViewChild("btnsPag") BtnsPagOff;
  @ViewChild("btnsPag2") BtnsPagOff2;
  estadoCarteraEscogido:number = 209;

  dataSource = new MatTableDataSource(this.items);
  dataSource2 = new MatTableDataSource(this.items2);

  // selection = new SelectionModel<TareasInterface>(true, []);

  constructor(
    private _itemService: PeticionesCrudService,
    public _authService:AuthService,
    public dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute,
  ) {
    this.cargarEventos(+this.option_Items_Pgn,1);
    this.cargarTareas(+this.option_Items_Pgn2,1);
  }

  ngOnInit() {
  }

  //Marcar checkbox
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource2.data.forEach(row2 => this.selection.select(row2));
  // }
  //
  // //Marcar checkbox
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource2.data.length;
  //   return numSelected === numRows;
  // }
  //
  // activarDesBtnEliminar(i){
  //   if(i.length>0) this.btnEliminar = false;
  //   else this.btnEliminar = true;
  // }

  cargarEventos(per_pgn:number, pgn:number){
    this._itemService.getItem(this.selectUrl,-1,-1,per_pgn,pgn,"","").then(
      res => {
        if(typeof res != "string"){
          if(res && res["data"] && res["meta"]){
            this.items = res["data"] as ExpedienteInterface[];
            this.paginacion = res["meta"].pagination as PaginacionInterface;
            this.calcularAvance();
            this.cargarCarterasItems();
            this.dataSource = new MatTableDataSource(this.items);
            this.activarDesactvarBtnsPag();
          }
          else{
            this.items = [];
            this.dataSource = new MatTableDataSource(this.items);
          }
        }
        else{
          this.items = [];
          this.dataSource = new MatTableDataSource(this.items);
        }
      });
  }

  cargarTareas(per_pgn:number, pgn:number){
    this._itemService.getItem(312,-1,-1,per_pgn,pgn,"","").then(
      res => {
        if(typeof res != "string"){
          if(res && res["data"] && res["meta"]){
            this.items2 = res["data"] as TareasInterface[];
            console.log(this.items2);
            this.dataSource2 = new MatTableDataSource(this.items2);
            // this.selection = new SelectionModel<TareasInterface>(true, []);
            this.paginacion2 = res["meta"].pagination as PaginacionInterface;
            this.selectExp();
            this.activarDesactvarBtnsPag2();
          }
          else{
            this.items2 = [];
            this.dataSource2 = new MatTableDataSource(this.items2);
            // this.selection = new SelectionModel<TareasInterface>(true, []);
          }
        }
        else{
          this.items2 = [];
          this.dataSource2 = new MatTableDataSource(this.items2);
          // this.selection = new SelectionModel<TareasInterface>(true, []);
        }
      });
  }

  calcularAvance(){
    this.avances = [];
    for(var x = 0; x < this.items.length; x++){
      let auxAvance:AvanceExpedienteInterface ={
        porcentajeAvanzado:0,
        tareasTerminadas:0,
        tareasPropuestas:0,
        contratosTerminados:0,
        contratosPropuestos:0,
        colorSpinner:"warn",
      };
      if(this.items[x].avance){
        var num = (this.items[x].avance).toString().split('.');
        if(num){
          if(num.length == 2){
            if(num[0].length == 1){
              auxAvance.tareasPropuestas = (+num[0].charAt(0));
            }
            else if(num[0].length == 2){
              auxAvance.tareasTerminadas = (+num[0].charAt(0));
              auxAvance.tareasPropuestas = (+num[0].charAt(1));
            }
            if(num[1].length == 2){
              auxAvance.contratosTerminados = (+num[1].charAt(0));
              auxAvance.contratosPropuestos = (+num[1].charAt(1));
            }
          }
          else if(num.length == 1){
            if(num[0].length == 1){
              auxAvance.tareasPropuestas = (+num[0].charAt(0));
            }
            else if(num[0].length == 2){
              auxAvance.tareasTerminadas = (+num[0].charAt(0));
              auxAvance.tareasPropuestas = (+num[0].charAt(1));
            }
          }
          auxAvance.porcentajeAvanzado = ( +( (auxAvance.tareasTerminadas + auxAvance.contratosTerminados) / (auxAvance.tareasPropuestas + auxAvance.contratosPropuestos) * 100).toFixed(1) );
          if(auxAvance.porcentajeAvanzado == 100) auxAvance.colorSpinner = "primary";
          else if(auxAvance.porcentajeAvanzado >= 50) auxAvance.colorSpinner = "accent";
          else auxAvance.colorSpinner = "warn";
        }
      }
      this.avances.push(auxAvance);
    }
  }

  abrirExpediente(row){
    this.router.navigate(['/evento', row.identificador]);
  }

  abrirExpediente2(row){
    this.router.navigate(['/evento', row.expediente]);
  }

  cargarCarterasItems(){
    this.selectCartera = [];
    this._itemService.getItem(8,-1,-1,-1,-1,"","").then( res => {
      if(typeof res != 'string'){
        this.carteras = (res as any).data as CarteraInterface[];
        for(var x = 0; x < this.items.length; x++){
          this.selectCartera.push(null);
          for(var z = 0; z < this.carteras.length; z++){
            if(this.items[x].cartera == this.carteras[z].identificador){
              this.selectCartera[x] = this.carteras[z].nombreCartera;
              z = this.carteras.length;
            }
          }
        }
      }
    })
  }

  //OPTION Elementos por Pgn- Funcion que se llama cada vez que se cambia el numero de items por pgn
  actualizarPaginacion() {
    this.paginacion.per_page = +this.option_Items_Pgn;
    this.cargarEventos(+this.option_Items_Pgn,1);
  }
  actualizarPaginacion2() {
    this.paginacion2.per_page = +this.option_Items_Pgn2;
    this.cargarTareas(+this.option_Items_Pgn2,1);
  }

  //BOTONES - Botones para cambiar de pagina
  cambiarPgn(i:number) {
    if(i == 1){
      if(this.paginacion.current_page != 1){
        this.cargarEventos(+this.option_Items_Pgn,1);
      }
    }
    else if(i == 2){
      if(this.paginacion.current_page > 1){
        this.cargarEventos(+this.option_Items_Pgn,this.paginacion.current_page-1);
      }
    }
    else if(i == 3){
      if(this.paginacion.current_page < this.paginacion.total_pages){
        this.cargarEventos(+this.option_Items_Pgn,this.paginacion.current_page+1);
      }
    }
    else if(i == 4){
      if(this.paginacion.current_page != this.paginacion.total_pages){
        this.cargarEventos(+this.option_Items_Pgn,this.paginacion.total_pages);
      }
    }
  }

  cambiarPgn2(i:number) { console.log("ENTRAAAAAAAAAAA")
    if(i == 1){
      if(this.paginacion2.current_page != 1){
        this.cargarTareas(+this.option_Items_Pgn2,1);
      }
    }
    else if(i == 2){
      if(this.paginacion2.current_page > 1){
        this.cargarTareas(+this.option_Items_Pgn2,this.paginacion2.current_page-1);
      }
    }
    else if(i == 3){
      if(this.paginacion2.current_page < this.paginacion2.total_pages){
        this.cargarTareas(+this.option_Items_Pgn2,this.paginacion2.current_page+1);
      }
    }
    else if(i == 4){
      if(this.paginacion2.current_page != this.paginacion2.total_pages){
        this.cargarTareas(+this.option_Items_Pgn2,this.paginacion2.total_pages);
      }
    }
  }

  activarDesactvarBtnsPag() {
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

  activarDesactvarBtnsPag2() {
    var div = this.BtnsPagOff2.nativeElement.children;
    if(this.paginacion2.current_page > 1){
      div[0].classList.remove('btnsPaginacionOff');
      div[1].classList.remove('btnsPaginacionOff');
    }
    else{
      div[0].classList.add('btnsPaginacionOff');
      div[1].classList.add('btnsPaginacionOff');
    }
    if(this.paginacion2.current_page < this.paginacion2.total_pages){
      div[2].classList.remove('btnsPaginacionOff');
      div[3].classList.remove('btnsPaginacionOff');
    }
    else{
      div[2].classList.add('btnsPaginacionOff');
      div[3].classList.add('btnsPaginacionOff');
    }
  }

  cambiarListaEstado(){
    this.selectUrl = +this.estadoCarteraEscogido;
    this.cargarEventos(+this.option_Items_Pgn,1);
  }

  selectExp(){
    this.exp = [];
    this._itemService.getItem(10,-1,-1,-1,-1,"","").then( res => {
      if(typeof res != 'string'){
        this.expAux = (res as any).data as ExpedienteInterface[];
        for(var x = 0; x < this.items2.length; x++){
          this.exp.push(null);
          for(var z = 0; z < this.expAux.length; z++){
            if(this.items2[x].expediente == this.expAux[z].identificador){
              this.exp[x] = this.expAux[z].nombreExpediente;
              z = this.expAux.length;
            }
          }
        }
      }
    })
  }

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
      //     this.selectUrl = 8; //TODO dependera del estado de las carteras a buscar
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
      // this.cargarItems(+this.option_Items_Pgn,1);
    }
  }

}
