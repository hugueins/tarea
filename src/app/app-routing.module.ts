// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { NuevoproveedorComponent } from './proveedores/nuevoproveedor/nuevoproveedor.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NuevoclienteComponent } from './clientes/nuevocliente/nuevocliente.component';
import { FacturasComponent } from './facturas/facturas.component';
import { NuevafacturaComponent } from './facturas/nuevafactura/nuevafactura.component';
import { UnidadmedidaComponent } from './unidadmedida/unidadmedida.component';
import { NuevaunidadmedidaComponent } from './unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component';
import { usuariosGuardGuard } from './Guards/usuarios-guard.guard';

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
        loadComponent: () => import('./proveedores/proveedores.component').then((m) => ProveedoresComponent),
        canActivate: [usuariosGuardGuard]
      },
      //TODO:nuevoProveedorComponente_1020109
      {
        path: 'nuevoproveedor',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m) => NuevoproveedorComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarproveedor/:id',
        loadComponent: () => import('./proveedores/nuevoproveedor/nuevoproveedor.component').then((m) => NuevoproveedorComponent),
        canActivate: [usuariosGuardGuard]
      },
      //TODO:Cliesntescompomnente_010920241521
      {
        path: 'clientes',
        loadComponent: () => import('./clientes/clientes.component').then((m) => ClientesComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'nuevocliente',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => NuevoclienteComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'editarcliente/:idClientes',
        loadComponent: () => import('./clientes/nuevocliente/nuevocliente.component').then((m) => NuevoclienteComponent),
        canActivate: [usuariosGuardGuard]
      },
        //TODO:facturas
        {
          path: 'facturas',
          loadComponent: () => import('./facturas/facturas.component').then((m) => FacturasComponent),
          canActivate: [usuariosGuardGuard]
        },
        {
          path: 'nuevafactura',
          loadComponent: () => import('./facturas/nuevafactura/nuevafactura.component').then((m) => NuevafacturaComponent),
          canActivate: [usuariosGuardGuard]
        },
        {
          path: 'editarfactura/:idFacturas',
          loadComponent: () => import('./facturas/nuevafactura/nuevafactura.component').then((m) => NuevafacturaComponent),
          canActivate: [usuariosGuardGuard]
        },
        //TODO:UnidadMedida
        {
          path: 'unidadmedida',
          loadComponent: () => import('./unidadmedida/unidadmedida.component').then((m) => UnidadmedidaComponent),
          canActivate: [usuariosGuardGuard]
        },
        {
          path: 'nuevaunidadmedida',
          loadComponent: () => import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => NuevaunidadmedidaComponent),
          canActivate: [usuariosGuardGuard]
        },
        {
          path: 'editarunidadmedida/:idUnidad_Medida',
          loadComponent: () => import('./unidadmedida/nuevaunidadmedida/nuevaunidadmedida.component').then((m) => NuevaunidadmedidaComponent),
          canActivate: [usuariosGuardGuard]
        },
        {
          path: 'productos',
          loadComponent: () => import('./productos/productos.component').then((m) => m.ProductosComponent),
          canActivate: [usuariosGuardGuard]
        },
        {
          path: 'nuevoproducto',
          loadComponent: () => import('./productos/nuevoproducto/nuevoproducto.component').then((m) => m.NuevoproductoComponent),
          canActivate: [usuariosGuardGuard]
        },
        {
          path: 'editarproducto/:idProductos',
          loadComponent: () => import('./productos/nuevoproducto/nuevoproducto.component').then((m) => m.NuevoproductoComponent),
          canActivate: [usuariosGuardGuard]
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
          path: 'login/:id',
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
  