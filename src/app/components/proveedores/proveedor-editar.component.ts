import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Proveedor }  from "../../interfaces/proveedorJ.interface";
import { ProveedorService } from '../../services/proveedor.service';
import { AlertService  } from '../../services/index';

@Component({
  selector: 'app-proveedor-editar',
  templateUrl: './proveedor-editar.component.html'
})
export class ProveedorEditarComponent implements OnInit {


  editar:boolean=true;
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
  errorProveedorModificar = false;
  errorMensaje:string[]=[];

  constructor(private _proveedorService:ProveedorService,
              private router:Router,
              private route:ActivatedRoute,
            ) {

    this.route.params.subscribe(parametros=>{this.id = parametros['id']

    this._proveedorService.getProveedor(this.id)
      .subscribe( data =>{
        console.log(data);
        this.proveedor= data.data;
        console.log("holaXDXDXDXD");
        console.log(this.proveedor);
      })

   });
 }

  ngOnInit() {
  }

  guardar(){
        //actualizando
        console.log("voy a actualizar un proveedor");
        this._proveedorService.modificarProveedor(this.proveedor, this.id)
            .subscribe(data=>{
              console.log("data que queremos actualizar"+data);
              this.errorProveedorModificar = false;
                this.router.navigate(['proveedores']);
            },
            error=> {
              let mensaje=JSON.parse(error._body);//Cambiar mensaje devuelto a JSON
              console.log(mensaje.error);
              this.errorMensaje=[];

              if(mensaje.error=="No posee permisos para ejecutar esta acción"){
                  this.errorMensaje.push("No posee permisos para ejecutar esta acción");
              }

              if(mensaje.error=="No estás verificado"){
                  this.errorMensaje.push("No estás verificado");
              }
              if (typeof(mensaje.error.nombreUsuario) != "undefined"){
                for(let i=0;i<mensaje.error.nombreUsuario.length;i++){
                  this.errorMensaje.push(mensaje.error.nombreUsuario[i]);
                }
              }
              console.log(this.errorMensaje);

              this.errorProveedorModificar =true;
            },);
        }



}
