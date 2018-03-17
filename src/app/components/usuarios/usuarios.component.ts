import { Component, OnInit } from '@angular/core';

import {LoginComponent} from '../login/login.component';

import { Usuario }  from "../../interfaces/usuario.interface";
import { ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { MatPaginatorModule, MatPaginator } from '@angular/material';
import { MatIcon} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule, MatButtonModule } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, UsuariosService, LogueadoService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';
import {EliminarUsuarioDialog} from "./eliminar-usuario-dialog.component";
import {EditarUsuarioDialog} from "./editar-usuario-dialog.component";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {


  loading:boolean = true;
  //pagination
  paginacion:any = [];
  cantidadPagina:any[]=[];

  usuariosActuales:any[] = [];
  totalPaginas:number;
  currentPage:number = 1;
  // k:number;



//megacaca
  ELEMENT_DATA: Usuario[];
  usuarios:any[] = [];
  displayedColumns = ['select','identificador', 'nombreUsuario', 'apodo', 'esVerificado','rol'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  selection = new SelectionModel<Usuario>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

    ngAfterViewInit() {
        console.log("entra en el sort ese");

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.selection = new SelectionModel<Usuario>(true, []);
      console.log(this.dataSource.sort);
    }
//finalmegacaca


  constructor(private _usuariosService:UsuariosService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService,
                public dialog: MatDialog
            ) {
              this.logueadoService.comprobarLogueado();

              console.log("estaLogueado:");
              console.log(this.logueadoService.estaLogueado);
        this._usuariosService.getUsuarios("1")
          .subscribe( data =>{
            console.log(data);//la data del getHeroes

            this.usuarios= data.data;
            console.log("array de usuarios:");
            console.log(this.usuarios); 


            //megapis
            this.ELEMENT_DATA = this.usuarios;
            this.displayedColumns = ['select','identificador', 'nombreUsuario', 'apodo', 'esVerificado','rol'];
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.selection = new SelectionModel<Usuario>(true, []);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            //finalmegapis


            this.totalPaginas = Math.ceil(this.usuarios.length/10);
            console.log("this.totalPaginas:");
            console.log(this.totalPaginas);
            this.loading=false;
            // if(localStorage.mecagoEnDios=="mucho"){
            //   if(localStorage.vengoDe="modificarUsuario"){
            //
            //     console.log("salchipapaaaaaaaaa")
            //     this.router.navigate(['/perfil']);
            //     this.router.navigate(['perfil']);
            //     console.log("salchipapaaaaaaaaaaaa2222222222222222222")
            //     delete localStorage.vengoDe;
            //     console.log("vengoDe despues de borrarlo",localStorage.vengoDe);
            //     location.reload(true);
            //     delete localStorage.vengoDe;
            //     localStorage.setItem("mecagoEnDios", "poco");
            //   }
            // }

          //  this.paginacion = data.meta.pagination;
            //let paginaActual= data.meta.pagination.current_page;

            // console.log("paginaActual");
            // console.log(paginaActual);
            // console.log("totalPaginas");
            // console.log(this.paginacion.total_pages);

            for(let i=0;i<this.totalPaginas;i++)
            {
              this.cantidadPagina.push(i);
            }

            if(this.usuarios.length>9){
              for(let i=0;i<=9;i++)
              {
                this.usuariosActuales.push(this.usuarios[i]);
              }
            }else{
              for(let i=0;i<=this.usuarios.length;i++)
              {
                this.usuariosActuales.push(this.usuarios[i]);
              }
            }



            // this.k=this.usuarios[0].identificador;
            // console.log(k)
            // para retrasar esto
            // //this.loading=false;
            // setTimeout(()=> {
            //   this.loading = false;
            //   this.heroes= data
            // }, 3000);


            // for(let key$ in data){
            //   console.log( data[key$]);//separo la data
            //   this.heroes.push(data[key$]);
            // }

          })
  }
  ngOnInit() {
  }
  openDialogEliminar(row) {


    console.log(row);

      const dialogRef = this.dialog.open(EliminarUsuarioDialog, {
        height: '200px',
        width: '450px',
        data: { row: row }
      });

      // dialogRef.afterClosed().subscribe(result => {
      //   console.log(`Dialog result: ${result}`);
      // });
    }

openDialogEditar(row){
   console.log(row);
   const dialogRef = this.dialog.open(EditarUsuarioDialog, {
     height: '600px',
     width: '450px',
     data: { row: row }
   });
}
  selectRow(row) {
   console.log(row);
   this.router.navigate(['/evento', row.identificador]);
 }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;

    // console.log("isAllSelected() "+this.selection);
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
        console.log("masterToggle() "+this.selection);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  // nuevaPagina(pagina:number){
  //   this.currentPage=pagina;
  //   console.log("pagina que pido:");
  //   console.log(pagina);
  //   let x = 10 * (pagina-1);
  //   let y = x + 9;
  //   this.usuariosActuales=[];
  //
  //   if(pagina==this.totalPaginas){
  //     for(let i=x;i<this.usuarios.length;i++)
  //     {
  //       this.usuariosActuales.push(this.usuarios[i]);
  //     }
  //   }else{
  //     for(let i=x;i<=y;i++)
  //     {
  //       this.usuariosActuales.push(this.usuarios[i]);
  //     }
  //   }




    // this._usuariosService.getUsuarios(pagina)
    //   .subscribe( data =>{
    //     console.log(data);//la data del getUsuarios
    //
    //     this.usuarios= data.data;
    //     this.loading=false;
    //     this.paginacion = data.meta.pagination;
    //     console.log(this.paginacion.total_pages);
    //
    //     for(let i=0;i<this.paginacion.total_pages;i++)
    //     {
    //       this.cantidadPagina.push(i);
    //     }
    //   })
  // }
  // ngOnChange(){
  //   this._usuariosService.getUsuarios();
  //
  //   this.refresh();
  // }

  // refresh(){
  // this.router.navigate(['usuarios']);
  // }
  // borrarUsuario(id:string){
  //     this._usuariosService.borrarUsuario(id)
  //         .subscribe(respuesta=>{
  //           if(respuesta){
  //             console.log("caracola");
  //             console.log(respuesta);
  //             console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
  //           this._usuariosService.getUsuarios("1");
  //           console.log( "aqui los ha pedido ya todos de nuevo y voy a hacer el router navigate a usuarios" );
  //           location.reload(true);
  //           this.router.navigate(['usuarios']);
  //           // this.refresh();
  //           }else{
  //             //todo bien
  //             delete this.usuarios[id];
  //           //   console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
  //           // this._usuariosService.getUsuarios();
  //           // console.log( "aqui los ha pedido ya todos de nuevo" );
  //           // this.refresh();
  //
  //
  //           }
  //
  //         })
  //
  //   }
}
