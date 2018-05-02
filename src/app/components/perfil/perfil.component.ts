import { Component, OnInit }                  from '@angular/core';
import { PeticionesCrudService, AuthService } from '../../services/index';
import { TareasInterface }                    from "../../interfaces/tareas.interface";
import { MatTableDataSource, MatDialog }      from '@angular/material';

// import { EditarPerfilDialog } from "./editar-perfil-dialog.component";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['../../app.component.css']
})
export class PerfilComponent implements OnInit {

  tareas:TareasInterface[];  //Guardar todas las tareas no finalizadas
  rol:string;                //Guardar el nombreRol

  dataSource = new MatTableDataSource();

  constructor(
    private _peticionescrudservice:PeticionesCrudService,
    public _authService:AuthService,
  ){
    //Cargar nombreRol y las tareas no finalizadas
    this._peticionescrudservice.getItem(4,this._authService.user.getValue().rol,-1,-1).then(
      (res) => {
        if(typeof res != 'string'){
          let rol:any = res as any;
          this.rol = rol.data.nombreRol;
        }
      }
    );
    this.cargarTareas();
  }

  ngOnInit() {
  }

  //Filtrar y guardar las tareas no terminadas
  cargarTareas(){
    this.tareas = [];
    this._peticionescrudservice.getItem(107,-1,-1,-1).then(
      (res) => {
        if(typeof res != 'string'){
          for(let i=0; i<(res["data"]).length; i++){
            if(res["data"][i].finalizado == 0) this.tareas.push(res["data"][i] as TareasInterface);
          }
          this.dataSource = new MatTableDataSource(this.tareas);
        }
      }
    );
  }

  actualizarTarea(row){
    row.finalizado = 1;
    this._peticionescrudservice.actualizarItem(2,row.identificador,row,-1).then(
      res =>{
        console.log(res);
        if(typeof res != 'string') this.cargarTareas();
      }
    )
  }

  openDialogEditarPerfil(){
     // console.log(this.usuario);
     // const dialogRef = this.dialog.open(EditarPerfilDialog, {
     //   height: '500px',
     //   width: '450px',
     //   data: { usuario: this.usuario , identificador:this.idNumber}
     // });
  }

}
