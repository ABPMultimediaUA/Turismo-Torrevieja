import { BrowserModule }                              from '@angular/platform-browser';
import { NgModule, Component, ViewChild }             from '@angular/core';
import { FormsModule, ReactiveFormsModule }           from '@angular/forms';
import { HttpModule }                                 from '@angular/http';
import { HttpClient, HttpHeaders, HttpClientModule }  from '@angular/common/http';
import { AppComponent }                               from './app.component';
import { APP_ROUTING }                                from './app.routes';
import { BrowserAnimationsModule }                    from '@angular/platform-browser/animations';
import { SelectionModel }                             from '@angular/cdk/collections';

// servicios
import { AlertService, ExpedientesService, AuthService, CarterasService, PeticionesCrudService,
AuthGuardService, AuthGuardUsuariosService, AuthGuardRolesService, AuthGuardCarterasService,
AuthGuardEventosService, AuthGuardEspaciosService, AuthGuardProveedoresService } from './services/index';

//Angular material
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIcon, MatPaginatorModule, MatTableDataSource, MatSort,
         MatSortModule, MatTableModule, MatFormFieldModule, MatNativeDateModule,
         MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatProgressBarModule,
         MatProgressSpinnerModule,MatIconRegistry, MatIconModule,MatButtonModule,MatInputModule
        } from '@angular/material';

//Componentes no login
import { NavbarComponent }            from './components/shared/navbar/navbar.component';
import { HomeComponent }              from './components/home/home.component';
import { AboutComponent }             from './components/about/about.component';
import { LoginComponent }             from './components/login/login.component';
import { FooterComponent }            from './components/shared/footer/footer.component';
import { ContactComponent }           from './components/contact/contact.component';

//Componentes Login
import { EspaciosComponent }          from './components/espacios/espacios.component';
import { NuevoEspacioComponent }      from './components/espacios/nuevo-espacio.component';
import { EliminarEspacioComponent }   from './components/espacios/eliminar-espacio.component';

import { ProveedoresComponent }       from './components/proveedores/proveedores.component';
import { NuevoProveedorComponent }    from './components/proveedores/nuevo-proveedor.component';
import { EliminarProveedorComponent } from './components/proveedores/eliminar-proveedor.component';

import { UsuariosComponent }          from './components/usuarios/usuarios.component';
import { NuevoUsuarioComponent }      from './components/usuarios/nuevo-usuario.component';
import { EliminarUsuarioComponent }   from './components/usuarios/eliminar-usuario.component';

import { RolesComponent }             from './components/roles/roles.component';
import { NuevoRolComponent }          from './components/roles/nuevo-rol.component';
import { EliminarRolComponent }       from './components/roles/eliminar-rol.component';

//Otros
import { VentanaEmergenteComponent }  from './components/ventana-emergente/ventana-emergente.component';




//TODO Para que?
import { IdsPipe } from './components/pipes/ids.pipe';
import { KeysPipe } from './components/pipes/keys.pipe';
import { Filter1Pipe } from './components/pipes/filter1.pipe';

import { MensajeComponent } from './components/shared/mensaje/mensaje.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';

import { CarterasComponent } from './components/carteras/carteras.component';
import { CarteraComponent } from './components/carteras/cartera.component';
import { NuevaCarteraComponent } from './components/carteras/nueva-cartera.component';


import { ExpedientesComponent } from './components/expedientes/expedientes.component';
import { ExpedienteComponent } from './components/expedientes/expediente.component';
import { NuevoExpedienteComponent } from './components/expedientes/nuevo-expediente.component';


import { RolComponent } from './components/roles/rol.component';
import { PerfilComponent } from './components/perfil/perfil.component';

import { EliminarCarteraDialog} from "./components/carteras/eliminar-cartera-dialog.component";
import { EditarCarteraDialog} from "./components/carteras/editar-cartera-dialog.component";
import { CrearExpedienteDialog} from "./components/carteras/crear-expediente-dialog.component";
import { EliminarExpedienteDialog } from "./components/carteras/eliminar-expediente-dialog.component";

import { EditarPerfilDialog } from "./components/perfil/editar-perfil-dialog.component";




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    FooterComponent,
    UsuariosComponent,
    EliminarUsuarioComponent,
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
    EliminarRolComponent,
    RolComponent,
    NuevoRolComponent,
    PerfilComponent,
    ExpedientesComponent,
    ExpedienteComponent,
    NuevoExpedienteComponent,
    EditarPerfilDialog,
    EliminarCarteraDialog,
    EditarCarteraDialog,
    CrearExpedienteDialog,
    EliminarExpedienteDialog,
    ProveedoresComponent,
    NuevoProveedorComponent,
    EliminarProveedorComponent,
    EspaciosComponent,
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
    CarterasService,
    PeticionesCrudService,
    AlertService,
    NavbarComponent,
    HomeComponent,
    ExpedientesService,
    MatDatepickerModule,
    AuthService,
    AuthGuardService,
    AuthGuardUsuariosService,
    AuthGuardRolesService,
    AuthGuardCarterasService,
    AuthGuardEventosService,
    AuthGuardEspaciosService,
    AuthGuardProveedoresService
  ],
  entryComponents: [
    //Ventanas emergentes usuarios
    NuevoUsuarioComponent,
    EliminarUsuarioComponent,

    //Ventanas emergentes espacio
    NuevoEspacioComponent,
    EliminarEspacioComponent,

    //Ventanas emergentes proveedor
    NuevoProveedorComponent,
    EliminarProveedorComponent,

    //Ventanas emergentes rol
    NuevoRolComponent,
    EliminarRolComponent,

    //Mensaje emergente
    VentanaEmergenteComponent,


      EliminarCarteraDialog,
      EditarPerfilDialog,
      EditarCarteraDialog,
      CrearExpedienteDialog,
      EliminarExpedienteDialog,

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
