import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../../app.component.css'],
})

export class NavbarComponent implements OnInit {

  constructor(
    public _authService:AuthService,
  ) {}

  ngOnInit(){
  }
}
