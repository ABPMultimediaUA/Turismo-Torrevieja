import { Component, OnInit } from '@angular/core';
import { NgForm }  from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ExpedienteInterfaz }  from "../../interfaces/expediente.interface";
import { AlertService, AuthenticationService, PeticionesCrudService, LogueadoService } from '../../services/index';

@Component({
  selector: 'app-nuevo-expediente',
  templateUrl: './nuevo-expediente.component.html'
})
export class NuevoExpedienteComponent implements OnInit {



constructor( private _crudService: PeticionesCrudService,
                private router:Router,
                private route:ActivatedRoute,//esto es para pasar como parametro
                public  logueadoService: LogueadoService
              )
  {
    this.logueadoService.comprobarLogueado();
    // this.evento.usuario= localStorage.identificador;
  }

  ngOnInit() {
  }
  
  guardar(){

  }

}
