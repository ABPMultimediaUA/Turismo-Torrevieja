import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../app.component.css'],
})

export class NavbarComponent implements OnInit {

  isLogged:boolean;

  constructor( public _authService:AuthService,) {
    this._authService.getEstadoLog().subscribe( res => { this.isLogged = res; });
  }

  ngOnInit() {
  }

  logout(){
    this._authService.logout(0);
  }

  cerrarSesion(){
    this._authService.logout(1);
  }

}
