import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ventana-emergente-pdf',
  templateUrl: './ventana-emergente-pdf.component.html',
  styleUrls: ['./ventana-emergente.component.css']
})
export class VentanaEmergentePdfComponent implements OnInit {

  fichero:string;
  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;

  constructor(public dialogRef: MatDialogRef<VentanaEmergentePdfComponent>,
              @Inject(MAT_DIALOG_DATA) public data
            )
  {
    if(data.item) this.fichero = "https://gvent.ovh/Prueba2_1/public/img/" + data.item;
  }

  ngOnInit() {
  }

  cerrarVentana(b){
    this.dialogRef.close();
  }

  afterLoadComplete(pdfData: any) {
     this.totalPages = pdfData.numPages;
     this.isLoaded = true;
   }

   nextPage() {
     this.page++;
   }

   prevPage() {
     this.page--;
   }
}
