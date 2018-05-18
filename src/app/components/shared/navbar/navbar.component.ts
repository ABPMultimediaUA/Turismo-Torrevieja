import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../app.component.css'],
})

export class NavbarComponent implements OnInit {

  selected:any;

  constructor( public _authService:AuthService ) {
    if(localStorage.getItem('navSelected')) this.selected = localStorage.getItem('navSelected');
    else this.selected = 0;
  }

  ngOnInit(){
  }

  cambiarSelect(i){
    this.selected = i;
    localStorage.setItem('navSelected', i);
  }

}
