import { Component, OnInit, ViewChild }       from '@angular/core';
import { MatDialogRef, MatDialog }            from '@angular/material';
import { PeticionesCrudService, AuthService } from '../../../services/index';
import { UsuarioInterface }                   from '../../../interfaces/usuario.interface';
import { VentanaEmergenteComponent }          from '../../ventana-emergente/ventana-emergente.component'
import { VentanaEmergentePreguntaComponent }  from '../../ventana-emergente/ventana-emergente-pregunta.component';

@Component({
  selector: 'app-perfil-dialog',
  templateUrl: './perfil-dialog.component.html',
  styleUrls: ['../../../app.component.css', './perfil-dialog.component.css']
})
export class PerfilDialogComponent implements OnInit {

  items:UsuarioInterface = {
    identificador:null,
    nombreUsuario:null,
    apodo:"null",
    correo:null,
    password:null,
    password_confirmation:null,
    esVerificado:null,
    rol:null,
    fechaActualizacion:null,
    fechaCreacion:null,
    fechaEliminacion:null,
    activo:null,
    observaciones:null,
  };
  itemSinModif:UsuarioInterface;

  @ViewChild("formulario") formulario;
  realizandoAccion:boolean = false;
  bloqCampos:boolean = true;
  modifPass:boolean = false;
  oldPass:string = "";

  constructor(
    public dialogRef: MatDialogRef<PerfilDialogComponent>,
    public dialog: MatDialog,
    private _itemService:PeticionesCrudService,
    public _authService:AuthService,
  ) {
      dialogRef.disableClose = true;
      this.items = this._authService.user.getValue();
      this.itemSinModif = Object.assign({}, this.items);
    }

  ngOnInit() {
  }

  cerrarDialogo(){
    if(this.formulario.form.dirty){
      const dialogRef = this.dialog.open(VentanaEmergentePreguntaComponent,{
        height: '17em',
        width: '32em',
        data: { item: "Si cierras se perderán los cambios realizados.\n¿Continuar?" }
      });
      dialogRef.afterClosed().subscribe( res => {
        if(res) this.dialogRef.close();
      });
    }
    else this.dialogRef.close();
  }

  alertaOk(){
    let sms:string = "Perfil actualizado correctamente.";
    let icono:number = 0;
    const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
      height: '17em',
      width: '32em',
      data: { item: sms, item2: icono }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.realizandoAccion = false;
    });
  }

  alertaNoOk(sms:string){
    let icono:number = 1;
    const dialogRef = this.dialog.open(VentanaEmergenteComponent,{
      height: '17em',
      width: '32em',
      data: { item: sms, item2: icono }
    });
    dialogRef.afterClosed().subscribe( res => {
      this.realizandoAccion = false;
    });
  }

  disable_enable_campos(){
    this.formulario.reset(this.itemSinModif, false);
    if(this.bloqCampos) this.bloqCampos = false;
    else this.restaurarValores();
  }

  restaurarValores(){
    this.formulario.reset(this.itemSinModif, false);
    this.bloqCampos = true;
    this.modifPass = false;
    this.oldPass = "";
  }

  modifItem(){
    this.realizandoAccion = true;
    if(this.modifPass){
      let user_pass:any={
        email:this.itemSinModif.correo,
        password:this.oldPass,
      }
      this._authService.getToken(user_pass).then(
        res => {
          if(typeof res != "string"){
            let resultado = res as any;
            this._authService.comprobarUsuario(resultado.access_token).then(
              res => {
                if(typeof res != "string"){
                  if(res == this.itemSinModif.identificador){
                    this.modificar();
                  }
                  else{
                    this.alertaNoOk("La contraseña introducida es incorrecta. No se ha podido verificar el usuario.");
                  }
                }
                else{
                  this.alertaNoOk("La contraseña introducida es incorrecta. No se ha podido verificar el usuario.");
                }
              });
          }
          else{
            this.alertaNoOk("La contraseña introducida es incorrecta. No se ha podido verificar el usuario.");
          }
        })
    }
    else{
      delete this.items.password;
      delete this.items.password_confirmation;
      this.modificar();
    }
  }
  modificar(){
    this._itemService.actualizarItem(5,this.items.identificador,this.items,-1)
      .then( res => {
        if(typeof res != "string") {
          delete this.items.password;
          delete this.items.password_confirmation;
          this.itemSinModif = Object.assign({}, this.items as UsuarioInterface);
          localStorage.setItem('user', JSON.stringify(this.items as UsuarioInterface));
          this._authService.user.next(this.items as UsuarioInterface);
          this.restaurarValores();
          this.alertaOk();
        }
        else this.alertaNoOk("Se ha producido un error actualizando el perfil.");
    })
  }

}
