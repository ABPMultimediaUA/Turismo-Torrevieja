import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

<<<<<<< HEAD
import { APP_ROUTING } from "./app.routes"
=======
// servicios

>>>>>>> ramon

import { UsuariosService }  from "./services/usuarios.service";
import { CarterasService }  from "./services/carteras.service";
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
import { NuevoUsuarioComponent } from './components/usuarios/nuevo-usuario.component';

import { ContactComponent } from './components/contact/contact.component';

import {IdsPipe} from './components/pipes/ids.pipe';
import { KeysPipe } from './components/pipes/keys.pipe';


import { MensajeComponent } from './components/shared/mensaje/mensaje.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';

import { CarterasComponent } from './components/carteras/carteras.component';
import { CarteraComponent } from './components/carteras/cartera.component';
import { NuevaCarteraComponent } from './components/carteras/nueva-cartera.component';


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
    MensajeComponent,
    MensajesComponent,
<<<<<<< HEAD
    CarteraComponent
=======
    CarterasComponent,
    CarteraComponent,
    NuevaCarteraComponent


>>>>>>> ramon
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
    CarterasService,
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
