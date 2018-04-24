import { Component, OnInit, ViewChild }         from '@angular/core';
import { PeticionesCrudService, AuthService }   from '../../services/index';
import { SelectionModel }                       from '@angular/cdk/collections';
import { MatTableDataSource, MatDialog }        from '@angular/material';
import { EliminarCarteraDialog }                from './eliminar-cartera-dialog.component';
import { PaginacionInterface }                  from '../../interfaces/paginacion.interface';
import { CarteraInterface }                     from '../../interfaces/cartera.interface';
import { NuevaCarteraComponent }                from './nueva-cartera.component';
import { Router }                               from "@angular/router";

@Component({
  selector: 'app-carteras',
  templateUrl: './carteras.component.html',
  styleUrls: ['../../app.component.css']
})

export class CarterasComponent implements OnInit {

  items:CarteraInterface[]=[];
  row:CarteraInterface;               //Devuelve la fila que se seleccione en la tabla
  paginacion:PaginacionInterface;     //Guardar todos los datos de paginacion
  option_Items_Pgn='10';              //Cantidad de items por pagina al cargar el componente
  selectUrl:number = 50;              //Selecciona la url para las peticiones getItem
  busqueda = -1;                      //Si se ha rellenado el campo de busqueda
  selectASC_DESC:number=-1;           //Saber si el usuario quiere ordenar los items: -1 nada seleccionado, 0 ASC, 1 DES
  valorEscogidoForOrder:number = -1;  //Para saber el elemento seleccionado, -1 valor neutro
  btnEliminar:boolean = true;         //Activar / desactivar boton de eliminar item/s
  @ViewChild("btnsPag") BtnsPagOff;   //Div que contiene los botones de paginacion
  estadoCarteraEscogido:number = 50;  //Valor radio button (url basica por estados)

  dataSource = new MatTableDataSource(this.items);            //Datos de la tabla
  selection = new SelectionModel<CarteraInterface>(true, []); //Filas seleccionadas

  constructor(
    private _itemService: PeticionesCrudService,
    private _authService:AuthService,
    public dialog: MatDialog,
    private router:Router,
  ){
    this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);
    this.cargarPaginacionInicial();
  }

  ngOnInit() {
  }

  //Realiza la peticion GetItems a la BD y actualiza las variables
  cargarItems(peticion:number, per_pgn:number, pgn:number){
    this._itemService.getItem(peticion,this.busqueda,per_pgn,pgn).then(
      res => {
        if(typeof res != "string"){
          if(res && res["data"] && res["meta"]){
            this.items = res["data"] as CarteraInterface[];
            this.paginacion = res["meta"].pagination as PaginacionInterface;
            this.ngAfterViewInit();
            this.activarDesactvarBtnsPag();
            console.log(this.items);
          }
          else{
            this.items = [];
            this.ngAfterViewInit();
          }
        }
        else{
          this.items = [];
          this.ngAfterViewInit();
        }
      });
  }

  //Cargar items en tabla
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.items);
    this.selection = new SelectionModel<CarteraInterface>(true, []);
  }

  //Inicializa variables paginacion
  cargarPaginacionInicial(){
    this.paginacion={
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

  //CHECKBOX ROW TABLA - Habilita o deshabilita el boton eliminar item/s
  activarDesBtnEliminar(i){
    if(i.length>0) {
      if(this.estadoCarteraEscogido == 51) this.btnEliminar = false;
    }
    else this.btnEliminar = true;
  }

  //Buscador
  realizarBusqueda(e){
    if(e.target.value == ""){
      this.busqueda = -1;
      this.selectUrl = this.estadoCarteraEscogido;
      e.target.value = "";
    }
    if(e.keyCode == 13){
      if(e.target.value != ""){
        this.selectUrl = 307; //TODO la url dependera de el estado de las carteras
        this.busqueda = e.target.value.toString();
      }
      this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);
    }

  }

  //BOTON - Funcion eliminar item/s
  botonEliminarItem(i){
    if(i){
      const dialogRef = this.dialog.open(EliminarCarteraDialog,{
        height: '90%',
        width: '90%',
        data: { item: i }
      });
      dialogRef.afterClosed().subscribe( res => {
        if(res){
          var pag:number;
          this.btnEliminar = true;
          if(i.length < this.paginacion.count) pag = this.paginacion.current_page;
          else if(i.length == this.paginacion.count && this.paginacion.current_page > 1) pag = this.paginacion.current_page - 1;
          else pag = 1;
          this.cargarItems(this.selectUrl,this.paginacion.per_page,pag)
        }
      });
    }
  }

  //BOTON - ROW - Se activacon el boton nuevo item o pinchando una fila, abre el formulario crear / editar item
  editarAnyadirItem(row){
    const dialogRef = this.dialog.open(NuevaCarteraComponent,{
      height: '90%',
      width: '37%',
      data: { item: row }
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.btnEliminar = true;
        this.cargarItems(this.selectUrl,this.paginacion.per_page,this.paginacion.current_page)
      }
    });
  }

  abrirCartera(row){
    this.router.navigate(['/cartera', row.identificador]);
  }

  //OPTION Elementos por Pgn- Funcion que se llama cada vez que se cambia el numero de items por pgn
  actualizarPaginacion(){
    this.paginacion.per_page = +this.option_Items_Pgn;
    this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);
  }

  //BOTONES - Botones para cambiar de pagina
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

  //Activa o desactiva los botones de paginacion dependiendo de si puede ser utilizado o no
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

  //CABECERA TABLA - Para hacer selects ORDER BY, cada vez que se pinche en una cabecera de la tabla
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
      // this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);
    }
  }

  cambiarListaEstado(){
    this.selection.clear();
    this.selectUrl = +this.estadoCarteraEscogido;
    this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);
  }

}
