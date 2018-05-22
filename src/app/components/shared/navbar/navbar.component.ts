import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService }                from '../../../services/index';
import { MatDialog }                  from '@angular/material';
import { PerfilDialogComponent }      from '../perfil-dialog/perfil-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../app.component.css'],
})

export class NavbarComponent implements OnInit {

  oldLog:boolean = this._authService.userLog.getValue();
  selected:any;

  constructor( public _authService:AuthService, public dialog:MatDialog ) {
    if(localStorage.getItem('navSelected')) this.selected = localStorage.getItem('navSelected');
    else this.selected = 0;
  }

  ngOnInit(){
  }

  ngDoCheck(){
    if(this.oldLog != this._authService.userLog.getValue()){
      this.selected = 0;
      this.oldLog = this._authService.userLog.getValue();
    }
  }

  cambiarSelect(i){
    this.selected = i;
    localStorage.setItem('navSelected', i);
  }

  perfil(){
    const dialogRef = this.dialog.open(PerfilDialogComponent, {
      height: '63%',
      width: '450px',
    });
  }
}
