import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  model: any = {};
  loginError = false;

  logueando:boolean=false;



  constructor( private _loginService:LoginService,
             ){  }

  ngOnInit() {
  }

  login() {
    this._loginService.login(this.model);
  }

  logout() {
    this._loginService.logout();
  }

}
