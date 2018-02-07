import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { LoginComponent } from "./components/login/login.component";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { UsuarioComponent } from "./components/usuarios/usuario.component";
import { NuevoUsuarioComponent } from "./components/usuarios/nuevo-usuario.component";
import { ContactComponent } from "./components/contact/contact.component";
import { MensajesComponent } from "./components/mensajes/mensajes.component";
import { CarteraComponent } from "./components/cartera/cartera.component";
import { RolesComponent } from './components/roles/roles.component';

import { ChatbotsComponent } from './chatbots/chatbots.component';


const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'chatbots', loadChildren: 'app/chatbots/chatbots.module#ChatbotsModule' },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'roles', component: RolesComponent },
  { path: 'cartera', component: CarteraComponent },
  { path: 'mensajes/:parame', component: MensajesComponent },
  //{ path: 'usuariosReloaded', component: UsuariosComponent },
  { path: 'nuevo-usuario', component: NuevoUsuarioComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
