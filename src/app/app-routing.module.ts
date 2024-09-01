// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import {ProveedoresComponent} from './proveedores/proveedores.component';
import { NuevoproveedorComponent } from './proveedores/nuevoproveedor/nuevoproveedor.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NuevoclienteComponent } from './clientes/nuevocliente/nuevocliente.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      //TODO:ProveedorComponente_2255_3108
      {
        path: 'proveedores',
        loadComponent: () => import('./proveedores/proveedores.component').then((m)=>ProveedoresComponent),
      },
      //TODO:nuevoProveedorComponente_1020109
      {
        path: 'nuevoproveedor',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m)=>NuevoproveedorComponent),
      },
        {
        path: 'editarproveedor/:id',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m)=>NuevoproveedorComponent),
      },
       //TODO:Cliesntescompomnente_010920241521
      {
        path: 'clientes',
        loadComponent: () => import('./clientes/clientes.component').then((m)=>ClientesComponent),
      },
      {
        path: 'nuevocliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m)=>NuevoclienteComponent),
      },
      {
        path: 'editarcliente/:idCliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m)=>NuevoclienteComponent),
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
