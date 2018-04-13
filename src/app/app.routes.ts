import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService }     from './services/auth-guard.service';

//Menu no login
import { HomeComponent }        from "./components/home/home.component";
import { AboutComponent }       from "./components/about/about.component";
import { LoginComponent }       from "./components/login/login.component";
import { ChatbotsComponent }    from './chatbots/chatbots.component';
import { ContactComponent }     from "./components/contact/contact.component";

//Menu login
import { PerfilComponent }      from "./components/perfil/perfil.component";
import { UsuariosComponent }    from "./components/usuarios/usuarios.component";
import { CarterasComponent }    from './components/carteras/carteras.component';
import { ExpedientesComponent } from './components/expedientes/expedientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { RolesComponent }       from './components/roles/roles.component';
import { EspaciosComponent }    from './components/espacios/espacios.component';

//Otros
import { MensajesComponent }    from "./components/mensajes/mensajes.component";




import { NuevoUsuarioComponent } from "./components/usuarios/nuevo-usuario.component";
import { UsuarioComponent } from "./components/usuarios/usuario.component";

import { CarteraComponent } from './components/carteras/cartera.component';
import { NuevaCarteraComponent } from './components/carteras/nueva-cartera.component';

import { ExpedienteComponent } from './components/expedientes/expediente.component';
import { NuevoExpedienteComponent } from './components/expedientes/nuevo-expediente.component';


import { NuevoRolComponent } from "./components/roles/nuevo-rol.component";
import { RolComponent } from "./components/roles/rol.component";

import { ProveedorComponent } from './components/proveedores/proveedor.component';
import { ProveedorEditarComponent } from './components/proveedores/proveedor-editar.component';
import { NuevoProveedorComponent } from './components/proveedores/nuevo-proveedor.component';



const app_routes: Routes = [
  //Menu no login
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'chatbots', loadChildren: 'app/chatbots/chatbots.module#ChatbotsModule' },

  //Menu Login
  { path: 'perfil', canActivate:[AuthGuardService], component: PerfilComponent },
  { path: 'perfil/:id', canActivate:[AuthGuardService], component: PerfilComponent }, //TODO ver si es necesario
  { path: 'usuarios', canActivate:[AuthGuardService], component: UsuariosComponent },
  { path: 'roles', canActivate:[AuthGuardService], component: RolesComponent },
  { path: 'carteras', canActivate:[AuthGuardService], component: CarterasComponent },
  { path: 'expedientes', canActivate:[AuthGuardService], component: ExpedientesComponent },
  { path: 'proveedores', canActivate:[AuthGuardService], component: ProveedoresComponent },
  { path: 'espacios', canActivate:[AuthGuardService], component: EspaciosComponent },

  //Otros
  { path: 'mensajes/:parame', component: MensajesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },


  //TODO ELIMINAR
  { path: 'nuevo-rol', component: NuevoRolComponent },
  { path: 'rol/:id', component: RolComponent },
  { path: 'mensajes/:parame', component: MensajesComponent },
  //{ path: 'usuariosReloaded', component: UsuariosComponent },
  //rutas usuarios
  { path: 'usuarios/:id', component: UsuariosComponent },
  { path: 'nuevo-usuario', component: NuevoUsuarioComponent },
  { path: 'usuario/:id', component: UsuarioComponent },

  //rutas carteras
  { path: 'carteras/:id', component: CarterasComponent },
  { path: 'nueva-cartera', component: NuevaCarteraComponent },
  { path: 'cartera/:id', component: CarteraComponent },

  //rutas expedientes
  { path: 'nuevo-expediente', component: NuevoExpedienteComponent },
  { path: 'expediente/:id', component: ExpedienteComponent },

  { path: 'nuevo-proveedor', component: NuevoProveedorComponent },
  { path: 'proveedor/:id', component: ProveedorComponent },
  { path: 'proveedoredit/:id', component: ProveedorEditarComponent },

  //Ruta espacios

  //{ path: 'usuariosReloaded', component: UsuariosComponent },
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
