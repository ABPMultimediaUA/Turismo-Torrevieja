import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

//AUTH GUARD GENERICO PARA TODOS
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor( private _router:Router, private _authService:AuthService ) {}
  canActivate(){
    if(this._authService.userLog.getValue()) return Promise.resolve(true);
    else{
      this._router.navigate(['login']);
      return Promise.resolve(false);
    }
  }
}

//AUTH GUARD USUARIOS
@Injectable()
export class AuthGuardUsuariosService implements CanActivate {
  constructor( private _router:Router, private _authService:AuthService ) {}
  canActivate(){
    if(this._authService.tienePermiso(55)) return Promise.resolve(true);
    else{
      this._router.navigate(['login']);
      return Promise.resolve(false);
    }
  }
}

//AUTH GUARD ROLES
@Injectable()
export class AuthGuardRolesService implements CanActivate {
  constructor( private _router:Router, private _authService:AuthService ) {}
  canActivate(){
    if(this._authService.tienePermiso(35)) return Promise.resolve(true);
    else{
      this._router.navigate(['login']);
      return Promise.resolve(false);
    }
  }
}

//AUTH GUARD CARTERAS
@Injectable()
export class AuthGuardCarterasService implements CanActivate {
  constructor( private _router:Router, private _authService:AuthService ) {}
  canActivate(){
    if(this._authService.tienePermiso(23)) return Promise.resolve(true);
    else{
      this._router.navigate(['login']);
      return Promise.resolve(false);
    }
  }
}

//AUTH GUARD EVENTOS
@Injectable()
export class AuthGuardEventosService implements CanActivate {
  constructor( private _router:Router, private _authService:AuthService ) {}
  canActivate(){
    if(this._authService.tienePermiso(3)) return Promise.resolve(true);
    else{
      this._router.navigate(['login']);
      return Promise.resolve(false);
    }
  }
}

//AUTH GUARD ESPACIOS
@Injectable()
export class AuthGuardEspaciosService implements CanActivate {
  constructor( private _router:Router, private _authService:AuthService ) {}
  canActivate(){
    if(this._authService.tienePermiso(7)) return Promise.resolve(true);
    else{
      this._router.navigate(['login']);
      return Promise.resolve(false);
    }
  }
}

//AUTH GUARD PROVEEDORES
@Injectable()
export class AuthGuardProveedoresService implements CanActivate {
  constructor( private _router:Router, private _authService:AuthService ) {}
  canActivate(){
    if(this._authService.tienePermiso(31)) return Promise.resolve(true);
    else{
      this._router.navigate(['login']);
      return Promise.resolve(false);
    }
  }

}
