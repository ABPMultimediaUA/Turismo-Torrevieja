import { Component, OnInit, ViewChild }         from '@angular/core';
import { PeticionesCrudService, AuthService }   from '../../services/index';
import { SelectionModel }                       from '@angular/cdk/collections';
import { MatTableDataSource, MatDialog }        from '@angular/material';
import { NuevoRolComponent }                    from './nuevo-rol.component';
import { EliminarRolComponent }                 from './eliminar-rol.component';
import { PaginacionInterface }                  from '../../interfaces/paginacion.interface';
import { RolesInterface }                       from '../../interfaces/roles.interface';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['../../app.component.css','./roles.component.css']
})

export class RolesComponent implements OnInit {

  items:RolesInterface[]=[];
  row:RolesInterface;               //Devuelve la fila que se seleccione en la tabla
  paginacion:PaginacionInterface;     //Guardar todos los datos de paginacion
  option_Items_Pgn='10';              //Cantidad de items por pagina al cargar el componente
  selectUrl:number = 4;               //Selecciona la url para las peticiones getItem
  busqueda = -1;                      //Si se ha rellenado el campo de busqueda
  selectASC_DESC:number=-1;           //Saber si el usuario quiere ordenar los items: -1 nada seleccionado, 0 ASC, 1 DES
  valorEscogidoForOrder:number = -1;  //Para saber el elemento seleccionado, -1 valor neutro
  btnEliminar:boolean = true;         //Activar / desactivar boton de eliminar item/s
  @ViewChild("btnsPag") BtnsPagOff;   //Div que contiene los botones de paginacion

  dataSource = new MatTableDataSource(this.items);            //Datos de la tabla
  selection = new SelectionModel<RolesInterface>(true, []); //Filas seleccionadas

  constructor(
    private _itemService: PeticionesCrudService,
    private _authService:AuthService,
    public dialog: MatDialog
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
            this.items = res["data"] as RolesInterface[];
            this.paginacion = res["meta"].pagination as PaginacionInterface;
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
    this.selection = new SelectionModel<RolesInterface>(true, []);
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
    (i.length > 0) ? this.btnEliminar = false : this.btnEliminar = true;
  }

  //Buscador
  //TODO por hacer, da error
  realizarBusqueda(e){
    if(e.target.value == ""){
      this.busqueda = -1;
      this.selectUrl = 4;
      e.target.value = "";
    }
    if(e.keyCode == 13){
      if(e.target.value != ""){
        this.selectUrl = 306;
        this.busqueda = e.target.value.toString();
      }
      this.cargarItems(this.selectUrl,+this.option_Items_Pgn,1);
    }
  }

  //BOTON - Funcion eliminar item/s
  botonEliminarItem(i){
    if(i){
      const dialogRef = this.dialog.open(EliminarRolComponent,{
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
    const dialogRef = this.dialog.open(NuevoRolComponent,{
      height: '90%',
      width: '90%',
      data: { item: row }
    });
    dialogRef.afterClosed().subscribe( res => {
      if(res){
        this.btnEliminar = true;
        this.cargarItems(this.selectUrl,this.paginacion.per_page,this.paginacion.current_page)
      }
    });
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
      //     this.selectUrl = 4;
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

































// import { Component, OnInit } from '@angular/core';
// import { LoginComponent } from '../login/login.component';
// import { HomeComponent } from "../home/home.component";
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClientModule } from '@angular/common/http';
// import { Router, ActivatedRoute } from '@angular/router';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//
// import { HttpModule } from '@angular/http';
// import { AlertService , PeticionesCrudService } from '../../services/index';
//
// @Component({
//   selector: 'app-roles',
//   templateUrl: './roles.component.html',
//   styleUrls: ['./roles.component.css']
// })
// export class RolesComponent implements OnInit {
//
//   roles:any[] = [];
//   loading:boolean = true;
//   //pagination
//   paginacion:any = [];
//   cantidadPagina:any[]=[];
//
//   rolesActuales:any[] = [];
//   totalPaginas:number;
//   currentPage:number = 1;
//
//
//   constructor(  private _rolesService: PeticionesCrudService,
//                 private router:Router,
//                 private route:ActivatedRoute,//esto es para pasar como parametro
//                 )
//   {
//     this._rolesService.getItem(4,-1,-1,3)
//     .then( data =>{ console.log(data);
//       this.roles= data as any;
//       this.totalPaginas = Math.ceil(this.roles.length/10);
//       this.loading=false;
//
//       for(let i=0;i<this.totalPaginas;i++){
//         this.cantidadPagina.push(i);
//       }
//
//       if(this.roles.length>9){
//         for(let i=0;i<=9;i++){
//           this.rolesActuales.push(this.roles[i]);
//         }
//       }else{
//         for(let i=0;i<this.roles.length;i++){
//           this.rolesActuales.push(this.roles[i]);
//         }
//       }
//     })
//   }
//
//   ngOnInit() {
//   }
//
//   nuevaPagina(pagina:number){
//     this.currentPage=pagina;
//     let x = 10 * (pagina-1);
//     let y = x + 9;
//     this.rolesActuales=[];
//
//     if(pagina==this.totalPaginas){
//       for(let i=x;i<this.roles.length;i++){
//         this.rolesActuales.push(this.roles[i]);
//       }
//     }else{
//       for(let i=x;i<=y;i++){
//         this.rolesActuales.push(this.roles[i]);
//       }
//     }
//   }
//
//     borrarRol(id:string){
//       this._rolesService.eliminarItem(4,id,-1)
//       .then(respuesta=>{
//         if(respuesta){
//           this._rolesService.getItem(4,1,-1,-1);
//           location.reload(true);
//           this.router.navigate(['roles']);
//           // this.refresh();
//         }else{
//           delete this.roles[id];
//         }
//       })
//   }
// }
