import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Proveedor }  from "../../interfaces/proveedorJ.interface";
import { AlertService, AuthenticationService } from '../../services/index';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html'
})
export class NuevoProveedorComponent implements OnInit {


  public proveedor:Proveedor={
    nombreProveedor:"",
    telefonoUno:"",
    telefonoDos:"",
    telefonoTres:"",
    correoUno:"",
    correoDos:"",
    clase:""
  };
  id:string;
  errorProveedor = false;
  nuevoProveedor = false;
  errorMensaje:string[]=[];


  constructor(private _proveedorService:ProveedorService,
              private router:Router,
              private route:ActivatedRoute,
            ) {


    this.route.params.subscribe(parametros=>{
          console.log(parametros);
          });
 }

  ngOnInit() {
  }

  guardar(){
          console.log(this.proveedor);
          console.log("hola");
            this._proveedorService.nuevoProveedor( this.proveedor )
              .subscribe( data=>{
                console.log(data);
                this.errorProveedor = false;
                this.nuevoProveedor = true;

              },
              error=> {
                let mensaje=JSON.parse(error._body);
                console.log(mensaje.error);
                this.errorMensaje=[];

                if(mensaje.error=="No posee permisos para ejecutar esta acción"){
                              this.errorMensaje.push("No posee permisos para ejecutar esta acción");
                }

                if(mensaje.error=="No estás verificado"){
                              this.errorMensaje.push("No estás verificado");
                }

                this.errorProveedor = true;
                this.nuevoProveedor = false;
              },);
    }

}
