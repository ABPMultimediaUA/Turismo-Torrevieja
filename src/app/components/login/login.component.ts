import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  model: any = {};

  constructor( public _loginService:LoginService,
             )
 {
 }

  ngOnInit() {
  }

  login() {
    this._loginService.login(this.model);
  }

}
