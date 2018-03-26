import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Proveedor }  from "../../interfaces/proveedorJ.interface";
import { ProveedorService } from '../../services/proveedor.service';
import { AlertService, AuthenticationService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html'
})
export class ProveedoresComponent implements OnInit {

proveedores:any[] = [];

  constructor(private _proveedorService:ProveedorService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService) {

    this._proveedorService.getProveedores()
      .subscribe( data =>{
        console.log(data);
        this.proveedores= data.data;
        console.log("holaXDXDXDXD");
        console.log(this.proveedores);
      })

   }

  ngOnInit() {
  }


  borrarProveedor(id:string){
      this._proveedorService.borrarProveedor(id)
          .subscribe(respuesta=>{
            if(respuesta){
              console.log(respuesta);
            this._proveedorService.getProveedores();
            location.reload(true);
            this.router.navigate(['proveedores']);
            // this.refresh();
            }else{
              //todo bien
              delete this.proveedores[id];
            //   console.log( "borrausuario y ahora va a pedir todos los usuarios de nuevo" );
            // this._usuariosService.getUsuarios();
            // console.log( "aqui los ha pedido ya todos de nuevo" );
            // this.refresh();


            }

          })

    }

}
