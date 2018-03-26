import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Proveedor }  from "../../interfaces/proveedorJ.interface";
import { ProveedorService } from '../../services/proveedor.service';
import { AlertService, AuthenticationService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-proveedor.component',
  templateUrl: './proveedor.component.html'
})
export class ProveedorComponent implements OnInit {

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

  constructor(private _proveedorService:ProveedorService,
              private router:Router,
              private route:ActivatedRoute,
              public  logueadoService: LogueadoService) {

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

}
