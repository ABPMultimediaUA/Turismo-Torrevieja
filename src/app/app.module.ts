import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatSortModule, MatTableModule} from '@angular/material';
import { MatFormFieldModule,MatNativeDateModule } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatProgressBarModule,MatProgressSpinnerModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

import {EliminarCarteraDialog} from "./components/carteras/eliminar-cartera-dialog.component";
import {EditarCarteraDialog} from "./components/carteras/editar-cartera-dialog.component";
import {CrearExpedienteDialog} from "./components/carteras/crear-expediente-dialog.component";
import {EliminarExpedienteDialog} from "./components/carteras/eliminar-expediente-dialog.component";

import {EliminarUsuarioDialog} from "./components/usuarios/eliminar-usuario-dialog.component";
import {EditarUsuarioDialog} from "./components/usuarios/editar-usuario-dialog.component";
import {EditarPerfilDialog} from "./components/perfil/editar-perfil-dialog.component";


import { MatIconRegistry, MatIconModule,MatButtonModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SelectionModel} from '@angular/cdk/collections';
import { APP_ROUTING } from "./app.routes"

// servicios
import { UsuariosService }  from "./services/usuarios.service";
import { CarterasService }  from "./services/carteras.service";
import { PeticionesCrudService }  from "./services/peticionesCRUD.service";
// import { AlertComponent } from './_directives/index';
// import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService,
 TokenService, DatosUsuarioService,  LogueadoService, ExpedientesService,
 TareasService } from './services/index';

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


import { ExpedientesComponent } from './components/expedientes/expedientes.component';
import { ExpedienteComponent } from './components/expedientes/expediente.component';
import { NuevoExpedienteComponent } from './components/expedientes/nuevo-expediente.component';

import { RolesComponent } from './components/roles/roles.component';
import { NuevoRolComponent } from './components/roles/nuevo-rol.component';
import { RolComponent } from './components/roles/rol.component';
import { PerfilComponent } from './components/perfil/perfil.component';

import { ProveedorService }  from "./services/proveedor.service";



import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ProveedorComponent } from './components/proveedores/proveedor.component';
import { ProveedorEditarComponent } from './components/proveedores/proveedor-editar.component';
import { NuevoProveedorComponent } from './components/proveedores/nuevo-proveedor.component';

import { EspaciosComponent } from './components/espacios/espacios.component';
import { EspacioComponent } from './components/espacios/espacio.component';
import { NuevoEspacioComponent } from './components/espacios/nuevo-espacio.component';
import { EliminarEspacioComponent } from './components/espacios/eliminar-espacio.component';
import { VentanaEmergenteComponent } from './components/ventana-emergente/ventana-emergente.component';



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
    ExpedientesComponent,
    ExpedienteComponent,
    NuevoExpedienteComponent,
    EliminarUsuarioDialog,
    EditarUsuarioDialog,
    EditarPerfilDialog,
    EliminarCarteraDialog,
    EditarCarteraDialog,
    CrearExpedienteDialog,
    EliminarExpedienteDialog,
    ProveedoresComponent,
    ProveedorComponent,
    ProveedorEditarComponent,
    NuevoProveedorComponent,
    EspaciosComponent,
    EspacioComponent,
    NuevoEspacioComponent,
    EliminarEspacioComponent,
    VentanaEmergenteComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    // FacebookModule.forRoot(),
    // FacebookModule,

    APP_ROUTING,
  ],
  providers: [
    UsuariosService,
    CarterasService,
    PeticionesCrudService,
    AlertService,
    AuthenticationService,
    TokenService,
    DatosUsuarioService,
    NavbarComponent,
    HomeComponent,
    LogueadoService,
    TareasService,
    ExpedientesService,
    MatDatepickerModule,
    ProveedorService
  ],
  entryComponents: [
    EliminarUsuarioDialog,
    EditarUsuarioDialog,
    EliminarCarteraDialog,
    EditarPerfilDialog,
    EditarCarteraDialog,
    CrearExpedienteDialog,
    EliminarExpedienteDialog,

    //Ventanas emergentes espacio
    EliminarEspacioComponent,
    NuevoEspacioComponent,

    //Mensaje emergente
    VentanaEmergenteComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
