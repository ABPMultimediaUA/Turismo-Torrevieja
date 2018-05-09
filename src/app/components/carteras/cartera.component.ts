import { Component, OnInit, ViewChild }         from '@angular/core';
import { PeticionesCrudService, AuthService }   from '../../services/index';
import { SelectionModel }                       from '@angular/cdk/collections';
import { MatTableDataSource, MatDialog }        from '@angular/material';
import { EliminarExpedienteDialog }             from './eliminar-expediente-dialog.component';
import { PaginacionInterface }                  from '../../interfaces/paginacion.interface';
import { CarteraInterface }                     from '../../interfaces/cartera.interface';
import { ExpedienteInterface }                  from '../../interfaces/expediente.interface';
import { AvanceExpedienteInterface }            from '../../interfaces/avanceExpediente.interface';
import { CrearExpedienteDialog }                from './crear-expediente-dialog.component';
import { Router, ActivatedRoute }               from "@angular/router";
import { VentanaEmergenteComponent }            from '../ventana-emergente/ventana-emergente.component'
import { VentanaEmergentePreguntaComponent }    from '../ventana-emergente/ventana-emergente-pregunta.component';

@Component({
  selector: 'app-cartera',
  templateUrl: './cartera.component.html',
  styleUrls: ['../../app.component.css']
})

export class CarteraComponent implements OnInit {

  cartera:CarteraInterface={          //ngForm cartera
    identificador:null,
    nombreCartera:null,
    year:null,
    trimestre:null,
    estado:null,
    fechaCreacion:null,
    fechaActualizacion:null,
    fechaEliminacion:null,
  };
  carteraSinModif:CarteraInterface={  //Cartera sin modificar
    identificador:null,
    nombreCartera:null,
    year:null,
    trimestre:null,
    estado:null,
    fechaCreacion:null,
    fechaActualizacion:null,
    fechaEliminacion:null,
  };
  items:ExpedienteInterface[]=[];     //Eventos de esta cartera
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
  selectUrl:number = 306;             //Selecciona la url para las peticiones getItem
  busqueda:string = "";               //Si se ha rellenado el campo de busqueda
  selectASC_DESC:number=-1;           //Saber si el usuario quiere ordenar los items: -1 nada seleccionado, 0 ASC, 1 DES
  valorEscogidoForOrder:number = -1;  //Para saber el elemento seleccionado, -1 valor neutro
  btnEliminar:boolean = true;         //Activar / desactivar boton de eliminar item/s
  @ViewChild("btnsPag") BtnsPagOff;   //Div que contiene los botones de paginacion

  bloqCampos:boolean = true;          //Habilitar o deshabilitar campos del form (avtivar desactivar modo edicion)
  fechaCreacion:string = "";          //Fecha modificada para mostrar por pantalla
  realizandoAccion:boolean = false;   //Mientras se esté editando la cartera

  dataSource = new MatTableDataSource(this.items);            //Datos de la tabla
  selection = new SelectionModel<ExpedienteInterface>(true, []); //Filas seleccionadas

  constructor(
    private _itemService: PeticionesCrudService,
    private _authService:AuthService,
    public dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute,
  ) {
    this.route.params.subscribe( param => {
      this._itemService.getItem(8,param.id,-1,-1,-1,"","").then( res => {
        if(typeof res != "string"){
          let r = res as any;
          this.cartera = r.data as CarteraInterface;
          this.carteraSinModif = Object.assign({}, r.data as CarteraInterface);
          let f = this.cartera.fechaCreacion.split(' ');
          f = f[0].split('-');
          this.fechaCreacion = f[2]+' - '+f[1]+' - '+f[0];
          this.cargarItems(+this.option_Items_Pgn,1);
        }
      })
    })
  }

  ngOnInit() {
  }

  //Realiza la peticion GetItems a la BD y actualiza las variables
  cargarItems(per_pgn:number, pgn:number){
    this._itemService.getItem(this.selectUrl,+this.cartera.identificador,-1,per_pgn,pgn,this.busqueda,"").then(
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

  calcularAvance(){
    this.avances = [];
    for(var x = 0; x < this.items.length; x++){
      let auxAvance:AvanceExpedienteInterface ={
        porcentajeAvanzado:0,
        tareasTerminadas:0,
        tareasPropuestas:0,
        colorSpinner:"warn",
      };
      if(this.items[x].avance){
        var num = (this.items[x].avance).toString().split('.');
        if(num && num.length == 2){
          auxAvance.tareasTerminadas = (+num[0]);
          auxAvance.tareasPropuestas = (+num[1]);
          auxAvance.porcentajeAvanzado = ( +(auxAvance.tareasTerminadas / auxAvance.tareasPropuestas * 100).toFixed(1) );
          if(auxAvance.porcentajeAvanzado == 100) auxAvance.colorSpinner = "primary";
          else if(auxAvance.porcentajeAvanzado >= 50) auxAvance.colorSpinner = "accent";
          else auxAvance.colorSpinner = "warn";
        }
      }
      this.avances.push(auxAvance);
    }
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
      this.selectUrl = 306;
      e.target.value = "";
    }
    if(e.keyCode == 13){
      if(e.target.value != ""){
        this.selectUrl = 307;
        this.busqueda = e.target.value.toString();
      }
      this.cargarItems(+this.option_Items_Pgn,1);
    }

  }

  //BOTON - Funcion eliminar item/s
  botonEliminarItem(i) {
    if(i){
      const dialogRef = this.dialog.open(EliminarExpedienteDialog,{
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
    const dialogRef = this.dialog.open(CrearExpedienteDialog,{
      height: '90%',
      width: '37%',
      data: { item: this.cartera.identificador }
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

  //Bloquea y desbloquea los campos del form al pulsar los btn EDITAR o CANCELAR
  disable_enable_campos() {
    if(this.bloqCampos) this.bloqCampos = false;
    else {
      this.restaurarValores();
      this.bloqCampos = true;
    }
  }

  //BOTON - Cuando se esta en la opcion de editar, devuelve los campos del form a su valor original
  restaurarValores() {
    this.cartera={
      identificador:this.carteraSinModif.identificador,
      nombreCartera:this.carteraSinModif.nombreCartera,
      year:this.carteraSinModif.year,
      trimestre:this.carteraSinModif.trimestre,
      estado:this.carteraSinModif.estado,
      fechaCreacion:this.carteraSinModif.fechaCreacion,
      fechaActualizacion:this.carteraSinModif.fechaActualizacion,
      fechaEliminacion:this.carteraSinModif.fechaEliminacion,
    }
  }

  //BOTON - editar la cartera
  editarCartera() {
    this.realizandoAccion = true;
    if(this.cartera.estado != this.carteraSinModif.estado){
      const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
        height: '17em',
        width: '32em',
        data: { item: "Una vez cambies el estado de la cartera no podrás volver al estado anterior. ¿Continuar?" }
      });
      dialogRef.afterClosed().subscribe( res => {
        if(res){
          this.editar();
        }
        else{
          this.realizandoAccion = false;
        }
      });
    }
    else this.editar();
  }
  editar(){
    this._itemService.actualizarItem(8,this.cartera.identificador,this.cartera,-1)
      .then( res => {
        if(typeof res != "string") {
          this.carteraSinModif = Object.assign({}, res as CarteraInterface);
          this.alertaOk();
        }
        else this.alertaNoOk();
      })
  }

  //Ventana emergente si se ha realizado una peticion y todo ha ido bien
  alertaOk() {
    let sms:string = "Acción realizada correctamente.";
    let icono:number = 0;
    const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
      height: '17em',
      width: '32em',
      data: { item: sms, item2: icono }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.bloqCampos = true;
      this.realizandoAccion = false;
    });
  }

  //Ventana emergente si se ha realizado una peticion y ha habido algun error
  alertaNoOk() {
    let sms:string = "Se ha producido un error inesperado.";
    let icono:number = 1;
    const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
      height: '17em',
      width: '32em',
      data: { item: sms, item2: icono }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.bloqCampos = true;
      this.realizandoAccion = false;
    });
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
