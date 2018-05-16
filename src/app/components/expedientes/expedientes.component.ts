import { Component, OnInit, ViewChild }         from '@angular/core';
import { PeticionesCrudService, AuthService }   from '../../services/index';
import { SelectionModel }                       from '@angular/cdk/collections';
import { MatTableDataSource, MatDialog }        from '@angular/material';
import { EliminarExpedienteComponent }          from './eliminar-expediente.component';
import { PaginacionInterface }                  from '../../interfaces/paginacion.interface';
import { CarteraInterface }                     from '../../interfaces/cartera.interface';
import { ExpedienteInterface }                  from '../../interfaces/expediente.interface';
import { AvanceExpedienteInterface }            from '../../interfaces/avanceExpediente.interface';
import { NuevoExpedienteComponent }             from './nuevo-expediente.component';
import { Router, ActivatedRoute }               from "@angular/router";
import { VentanaEmergenteComponent }            from '../ventana-emergente/ventana-emergente.component'

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['../../app.component.css']
})

export class ExpedientesComponent implements OnInit {

  items:ExpedienteInterface[]=[];
  avances:AvanceExpedienteInterface[]=[];
  paginacion:PaginacionInterface={    //Guardar todos los datos de paginacion
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
  option_Items_Pgn='10';              //Cantidad de items por pagina al cargar el componente
  selectUrl:number = 208;               //Selecciona la url para las peticiones getItem
  busqueda:string = "";               //Si se ha rellenado el campo de busqueda
  selectASC_DESC:number=-1;           //Saber si el usuario quiere ordenar los items: -1 nada seleccionado, 0 ASC, 1 DES
  valorEscogidoForOrder:number = -1;  //Para saber el elemento seleccionado, -1 valor neutro
  btnEliminar:boolean = true;         //Activar / desactivar boton de eliminar item/s
  @ViewChild("btnsPag") BtnsPagOff;   //Div que contiene los botones de paginacion
  estadoCarteraEscogido:number = 208; //Valor radio button (url basica por estados) TODO hacer cuando este hecho en backend

  dataSource = new MatTableDataSource(this.items);            //Datos de la tabla
  selection = new SelectionModel<ExpedienteInterface>(true, []); //Filas seleccionadas

  constructor(
    private _itemService: PeticionesCrudService,
    private _authService:AuthService,
    public dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute,
  ) {
    this.cargarItems(+this.option_Items_Pgn,1);
  }

  ngOnInit() {
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

  //Realiza la peticion GetItems a la BD y actualiza las variables
  cargarItems(per_pgn:number, pgn:number){
    this._itemService.getItem(this.selectUrl,-1,-1,per_pgn,pgn,this.busqueda,"").then(
      res => {
        if(typeof res != "string"){
          if(res && res["data"] && res["meta"]){
            this.items = res["data"] as ExpedienteInterface[];
            this.paginacion = res["meta"].pagination as PaginacionInterface;
            this.calcularAvance();
            this.ngAfterViewInit();
            this.activarDesactvarBtnsPag();
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
    this.selection = new SelectionModel<ExpedienteInterface>(true, []);
  }

  //Marcar checkbox
  masterToggle(){
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
  activarDesBtnEliminar(i) {
    if(i.length>0) {
      this.btnEliminar = false;
    }
    else this.btnEliminar = true;
  }

  //Buscador
  realizarBusqueda(e){
    if(e.target.value == ""){
      this.busqueda = "";
      this.selectUrl = 0;
      e.target.value = "";
    }
    if(e.keyCode == 13){
      if(e.target.value != ""){
        this.selectUrl = 202;
        this.busqueda = e.target.value.toString();
      }
      this.cargarItems(+this.option_Items_Pgn,1);
    }

  }

  //BOTON - Funcion eliminar item/s
  botonEliminarItem(i) {
    if(i){
      const dialogRef = this.dialog.open(EliminarExpedienteComponent,{
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
          this.cargarItems(this.paginacion.per_page,pag)
        }
      });
    }
  }

  //BOTON - ROW - Se activa con el boton nuevo item o pinchando una fila, abre el formulario crear / editar item
  nuevoEvento() {
    const dialogRef = this.dialog.open(NuevoExpedienteComponent,{
      height: '90%',
      width: '37%',
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.btnEliminar = true;
        this.cargarItems(this.paginacion.per_page,this.paginacion.current_page)
      }
    });
  }

  abrirExpediente(row){
    this.router.navigate(['/expediente', row.identificador]);
  }

  //TODO eliminar
  cargarCarterasItems(i,e){
    if(i && e.innerHTML == ''){
      e.innerHTML = "Cargando...";
      this._itemService.getItem(8,i,-1,-1,-1,"","").then(
        res => {
          if(typeof res != "string"){
            let r = res as any;
            console.log(r.data);
            let icon:string;
            if(r.data.estado == 1) icon = '';
            else if(r.data.estado == 2) icon = '';
            else if(r.data.estado == 3) icon = '';
            // e.innerHTML = r.data.nombreCartera + ' ' + icon;
            if(r) e.innerHTML = r.data.nombreCartera;
          }
          else{
            e.innerHTML = 'No se pudo cargar este apartado por un error o porque no existe'
          }
        });
    }
  }

  //OPTION Elementos por Pgn- Funcion que se llama cada vez que se cambia el numero de items por pgn
  actualizarPaginacion() {
    this.paginacion.per_page = +this.option_Items_Pgn;
    this.cargarItems(+this.option_Items_Pgn,1);
  }

  //BOTONES - Botones para cambiar de pagina
  cambiarPgn(i:number) {
    if(i == 1){
      if(this.paginacion.current_page != 1){
        this.cargarItems(+this.option_Items_Pgn,1);
      }
    }
    else if(i == 2){
      if(this.paginacion.current_page > 1){
        this.cargarItems(+this.option_Items_Pgn,this.paginacion.current_page-1);
      }
    }
    else if(i == 3){
      if(this.paginacion.current_page < this.paginacion.total_pages){
        this.cargarItems(+this.option_Items_Pgn,this.paginacion.current_page+1);
      }
    }
    else if(i == 4){
      if(this.paginacion.current_page != this.paginacion.total_pages){
        this.cargarItems(+this.option_Items_Pgn,this.paginacion.total_pages);
      }
    }
  }

  //Activa o desactiva los botones de paginacion dependiendo de si puede ser utilizado o no
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

  cambiarListaEstado(){
    this.selection.clear();
    this.selectUrl = +this.estadoCarteraEscogido;
    this.cargarItems(+this.option_Items_Pgn,1);
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
      // this.cargarItems(+this.option_Items_Pgn,1);
    }
  }

}
