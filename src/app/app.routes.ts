import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/perfil/perfil.component";



import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { NuevoUsuarioComponent } from "./components/usuarios/nuevo-usuario.component";
import { UsuarioComponent } from "./components/usuarios/usuario.component";

import { CarterasComponent } from './components/carteras/carteras.component';
import { CarteraComponent } from './components/carteras/cartera.component';
import { NuevaCarteraComponent } from './components/carteras/nueva-cartera.component';

import { ContactComponent } from "./components/contact/contact.component";
import { MensajesComponent } from "./components/mensajes/mensajes.component";

import { RolesComponent } from './components/roles/roles.component';
import { NuevoRolComponent } from "./components/roles/nuevo-rol.component";
import { RolComponent } from "./components/roles/rol.component";
import { ChatbotsComponent } from './chatbots/chatbots.component';


import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedorComponent } from './components/proveedores/proveedor.component';
import { ProveedorEditarComponent } from './components/proveedores/proveedor-editar.component';
import { NuevoProveedorComponent } from './components/proveedores/nuevo-proveedor.component';


import { ExpedienteComponent } from './components/expedientes/expediente.component';
import { ExpedientesComponent } from './components/expedientes/expedientes.component';
// import { NuevoExpedienteComponent } from './components/carteras/nueva-cartera.component';


const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'perfil', component: PerfilComponent },

  { path: 'chatbots', loadChildren: 'app/chatbots/chatbots.module#ChatbotsModule' },

  //rutas usuarios
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'nuevo-rol', component: NuevoRolComponent },
  { path: 'rol/:id', component: RolComponent },
  { path: 'mensajes/:parame', component: MensajesComponent },
  //{ path: 'usuariosReloaded', component: UsuariosComponent },
  { path: 'nuevo-usuario', component: NuevoUsuarioComponent },
  { path: 'usuario/:id', component: UsuarioComponent },

  //rutas carteras
  { path: 'carteras', component: CarterasComponent },
  { path: 'nueva-cartera', component: NuevaCarteraComponent },
  { path: 'cartera/:id', component: CarteraComponent },

  { path: 'nuevo-proveedor', component: NuevoProveedorComponent },
  //  { path: 'proveedor/:id', component: ProveedorComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'proveedoredit/:id', component: ProveedorEditarComponent },



  //expedientes
  { path: 'expediente/:id', component: ExpedienteComponent },
  { path: 'expedientes', component: ExpedientesComponent },

  { path: 'mensajes/:parame', component: MensajesComponent },
  //{ path: 'usuariosReloaded', component: UsuariosComponent },

  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
