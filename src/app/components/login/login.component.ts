import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  model: any = {};

  constructor( public _authService:AuthService,
             )
 {
 }

  ngOnInit() {
  }

  login() {
    this._authService.login(this.model);
  }

}
