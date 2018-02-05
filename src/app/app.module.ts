import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { APP_ROUTING } from "./app.routes"

import { UsuariosService }  from "./services/usuarios.service";
// import { AlertComponent } from './_directives/index';
// import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, TokenService, LogueadoService } from './services/index';



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { ContactComponent } from './components/contact/contact.component';

import {IdsPipe} from './components/pipes/ids.pipe';
import { KeysPipe } from './components/pipes/keys.pipe';
import { NuevoUsuarioComponent } from './components/usuarios/nuevo-usuario.component';
import { SidenavbarComponent } from './components/shared/sidenavbar/sidenavbar.component';
import { MensajeComponent } from './components/shared/mensaje/mensaje.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';
import { CarteraComponent } from './components/cartera/cartera.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    FooterComponent,
    UsuariosComponent,
    UsuarioComponent,
    ContactComponent,
    IdsPipe,
    KeysPipe,
    NuevoUsuarioComponent,
    SidenavbarComponent,
    MensajeComponent,
    MensajesComponent,
    CarteraComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [
    UsuariosService,
    AlertService,
    AuthenticationService,
    TokenService,
    NavbarComponent,
    HomeComponent,
    LogueadoService

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
