import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';
import { AuthGuardService, AuthGuardUsuariosService, AuthGuardRolesService,
AuthGuardCarterasService, AuthGuardEventosService, AuthGuardEspaciosService,
AuthGuardProveedoresService, ConfirmDeactivateExpedienteGuard,
ConfirmDeactivateCarteraGuard } from './services/auth-guard.service';

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
import { CarteraComponent }     from './components/carteras/cartera.component';
import { ExpedientesComponent } from './components/expedientes/expedientes.component';
import { ExpedienteComponent }  from './components/expedientes/expediente.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { RolesComponent }       from './components/roles/roles.component';
import { EspaciosComponent }    from './components/espacios/espacios.component';

//Otros
import { MensajesComponent }    from "./components/mensajes/mensajes.component";

import { PublicarComponent } from "./components/publicar/publicar.component";

import { GraficasComponent } from './components/graficas/graficas.component';

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
  { path: 'usuarios', canActivate:[AuthGuardService,AuthGuardUsuariosService], component: UsuariosComponent },
  { path: 'roles', canActivate:[AuthGuardService,AuthGuardRolesService], component: RolesComponent },
  { path: 'carteras', canActivate:[AuthGuardService,AuthGuardCarterasService], component: CarterasComponent },
  { path: 'cartera/:id', canActivate:[AuthGuardService,AuthGuardCarterasService], component: CarteraComponent, canDeactivate:[ConfirmDeactivateCarteraGuard] },
  { path: 'expedientes', canActivate:[AuthGuardService,AuthGuardEventosService], component:ExpedientesComponent},
  { path: 'expediente/:id', canActivate:[AuthGuardService,AuthGuardEventosService], component:ExpedienteComponent, canDeactivate:[ConfirmDeactivateExpedienteGuard] },
  { path: 'espacios', canActivate:[AuthGuardService,AuthGuardEspaciosService], component: EspaciosComponent },
  { path: 'proveedores', canActivate:[AuthGuardService,AuthGuardProveedoresService], component: ProveedoresComponent },

  { path: 'publicar', canActivate:[AuthGuardService], component: PublicarComponent },
  { path: 'graficas', canActivate:[AuthGuardService], component: GraficasComponent },

  //Otros
  { path: 'mensajes/:parame', component: MensajesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },

  //{ path: 'usuariosReloaded', component: UsuariosComponent }, //TODO que es esto???
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
