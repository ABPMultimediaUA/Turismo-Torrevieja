import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ventana-emergente',
  templateUrl: './ventana-emergente.component.html',
  styleUrls: ['./ventana-emergente.component.css']
})
export class VentanaEmergenteComponent implements OnInit {

  mensaje:string;
  iconoBien:boolean = false;
  iconoError:boolean = false;

  constructor(public dialogRef: MatDialogRef<VentanaEmergenteComponent>,
              @Inject(MAT_DIALOG_DATA) public data
            )
  {
    if(data.item) this.mensaje = data.item;
    if(data.item2 == 0) this.iconoBien = true;
    else if(data.item2 ==1 ) this.iconoError = true;
  }

  ngOnInit() {
  }

  cerrarVentana(){
    this.dialogRef.close();
  }

}
