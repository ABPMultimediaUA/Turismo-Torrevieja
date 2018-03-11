import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatSortModule, MatTableModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatProgressBarModule,MatProgressSpinnerModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {EliminarDialog} from "./components/eventos/eliminar-dialog.component";
import {EditarDialog} from "./components/eventos/editar-dialog.component";


import { MatIconRegistry, MatIconModule,MatButtonModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SelectionModel} from '@angular/cdk/collections';
import { APP_ROUTING } from "./app.routes"

// servicios
import { UsuariosService }  from "./services/usuarios.service";
import { RolesService }  from "./services/roles.service";
import { CarterasService }  from "./services/carteras.service";
// import { AlertComponent } from './_directives/index';
// import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService,
 TokenService, DatosUsuarioService,
EventosService,  LogueadoService, ExpedientesService } from './services/index';

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
import {Filter1Pipe} from './components/pipes/filter1.pipe';

import { MensajeComponent } from './components/shared/mensaje/mensaje.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';

import { CarterasComponent } from './components/carteras/carteras.component';
import { CarteraComponent } from './components/carteras/cartera.component';
import { NuevaCarteraComponent } from './components/carteras/nueva-cartera.component';

import { EventosComponent } from './components/eventos/eventos.component';
import { EventoComponent } from './components/eventos/evento.component';
import { NuevoEventoComponent } from './components/eventos/nuevo-evento.component';

import { ExpedientesComponent } from './components/expedientes/expedientes.component';
import { ExpedienteComponent } from './components/expedientes/expediente.component';
import { NuevoExpedienteComponent } from './components/expedientes/nuevo-expediente.component';

import { RolesComponent } from './components/roles/roles.component';
import { NuevoRolComponent } from './components/roles/nuevo-rol.component';
import { RolComponent } from './components/roles/rol.component';
import { PerfilComponent } from './components/perfil/perfil.component';

@NgModule({
  entryComponents: [
    EliminarDialog,
    EditarDialog
  ],
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
    Filter1Pipe,
    NuevoUsuarioComponent,
    MensajeComponent,
    MensajesComponent,
    CarterasComponent,
    CarteraComponent,
    NuevaCarteraComponent,
    RolesComponent,
    RolComponent,
    NuevoRolComponent,
    PerfilComponent,
    EventosComponent,
    EventoComponent,
    NuevoEventoComponent,
    ExpedientesComponent,
    ExpedienteComponent,
    NuevoExpedienteComponent,
    EliminarDialog,
    EditarDialog
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,


    APP_ROUTING
  ],
  providers: [
    UsuariosService,
    CarterasService,
    RolesService,
    AlertService,
    AuthenticationService,
    TokenService,
    DatosUsuarioService,
    NavbarComponent,
    HomeComponent,
    LogueadoService,
    EventosService,
    ExpedientesService,
    EliminarDialog

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
