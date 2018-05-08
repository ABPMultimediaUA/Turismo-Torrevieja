import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ventana-emergente-pregunta',
  templateUrl: './ventana-emergente-pregunta.component.html',
  styleUrls: ['./ventana-emergente.component.css']
})
export class VentanaEmergentePreguntaComponent implements OnInit {

  mensaje:string;

  constructor(public dialogRef: MatDialogRef<VentanaEmergentePreguntaComponent>,
              @Inject(MAT_DIALOG_DATA) public data
            )
  {
    dialogRef.disableClose = true;
    if(data.item) this.mensaje = data.item;
  }

  ngOnInit() {
  }

  cerrarVentana(b){
    this.dialogRef.close(b);
  }

}
