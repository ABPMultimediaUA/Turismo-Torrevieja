import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { APP_ROUTING } from "./app.routes"

// servicios
import { HeroesService }  from "./services/heroes.service";

import { UsuariosService }  from "./services/usuarios.service";

import { ProveedorService }  from "./services/proveedor.service";
import { EspaciosService }  from "./services/espacios.service";

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
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedorComponent } from "./components/proveedores/proveedor.component";
import { NuevoProveedorComponent } from './components/proveedores/nuevo-proveedor.component';
import { ProveedorEditarComponent } from './components/proveedores//proveedor-editar.component';
import { EspaciosComponent } from './components/espacios/espacios.component';
import { EspacioComponent } from './components/espacios/espacio.component';
import { NuevoEspacioComponent } from './components/espacios/nuevo-espacio.component';
import { EspacioEditarComponent } from './components/espacios/espacio-editar.component';


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
    ProveedoresComponent,
    ProveedorComponent,
    NuevoProveedorComponent,
    ProveedorEditarComponent,
    EspaciosComponent,
    EspacioComponent,
    NuevoEspacioComponent,
    EspacioEditarComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTING
  ],
  providers: [
    HeroesService,
    UsuariosService,
    ProveedorService,
    EspaciosService,
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
