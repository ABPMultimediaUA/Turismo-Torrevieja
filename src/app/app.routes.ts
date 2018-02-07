import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { LoginComponent } from "./components/login/login.component";
import { UsuariosComponent } from "./components/usuarios/usuarios.component";
import { UsuarioComponent } from "./components/usuarios/usuario.component";
import { NuevoUsuarioComponent } from "./components/usuarios/nuevo-usuario.component";
import { ContactComponent } from "./components/contact/contact.component";
import { ProveedoresComponent } from "./components/proveedores/proveedores.component";
import { ProveedorComponent } from "./components/proveedores/proveedor.component";
import { NuevoProveedorComponent } from "./components/proveedores/nuevo-proveedor.component";
import { ProveedorEditarComponent } from "./components/proveedores/proveedor-editar.component";
import { EspaciosComponent } from "./components/espacios/espacios.component";


const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'usuarios', component: UsuariosComponent },
  //{ path: 'usuariosReloaded', component: UsuariosComponent },
  { path: 'nuevo-usuario', component: NuevoUsuarioComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'proveedor/:id', component: ProveedorComponent },
  { path: 'nuevo-proveedor', component: NuevoProveedorComponent },
  { path: 'proveedoredit/:id', component: ProveedorEditarComponent },
  { path: 'espacios', component: EspaciosComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
