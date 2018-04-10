import { Component, OnInit, Inject } from '@angular/core';
import { ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { MatPaginatorModule, MatPaginator } from '@angular/material';
import { MatIcon} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {LoginComponent} from '../login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule, MatButtonModule } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

import { Element }  from "../../interfaces/element.interface";
import { Cartera }  from "../../interfaces/cartera.interface";
import {HomeComponent} from "../home/home.component";
import { Router, ActivatedRoute } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';//ramoon

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
// import { AuthenticationService } from '../../services/authentication.service';
// import {AlertService } from '../../services/alert.service';
import { AlertService, AuthenticationService, CarterasService } from '../../services/index';
// import { AlertComponent } from '../../../_directives/index';
// import { AuthGuard } from '../../../_guards/index';
@Component({
  selector: 'eliminar-expediente-dialog',
  templateUrl: 'eliminar-expediente-dialog.html',
})
export class EliminarExpedienteDialog {
  row:Cartera;
  id:string;
  eliminando:boolean =false;
  constructor(private _carterasService:CarterasService,
              private router:Router,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<EliminarExpedienteDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any
            ) {
              this.row=data.row;
              console.log(this.row);


               this.id=this.row.identificador;

               console.log(this.row.identificador);


                  this.eliminando=false;
 }
 borrarCartera(){

   this.eliminando=true;
   // var rand = Math.floor(Math.random() * 10);
   // console.log(rand);
   setTimeout(()=>{

        this.dialogRef.close();
          // this.router.navigate(['/carteras']);
      location.reload(true);
   },2000);

     this._carterasService.borrarCartera( this.id)
         .subscribe(respuesta=>{
           if(respuesta){
             console.log("caracola");
             console.log(respuesta);
             console.log( "borra cartera y ahora va a pedir todos las carteras de nuevo" );
           this._carterasService.getCarteras("1");
           console.log( "aqui los ha pedido ya todos de nuevo y voy a hacer el router navigate a carteras" );

            // this.dialogRef.close();

           // this.router.navigate(['eventos']);
           // this.refresh();
           }else{
             //todo bien
             // delete this.eventos[id];
           //   console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
           // this._usuariosService.getUsuarios();
           // console.log( "aqui los ha pedido ya todos de nuevo" );
           // this.refresh();


           }

         })

   }

   cancelar(){
     this.dialogRef.close();
   }
}
