import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from './Guard/ingresado.guard';
import { NoIngresadoGuard } from './Guard/no-ingresado.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Inicio/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'index',
    loadChildren: () => import('./Inicio/index/index.module').then( m => m.IndexPageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'listar-cliente',
    loadChildren: () => import('./Clientes/listar-cliente/listar-cliente.module').then( m => m.ListarClientePageModule),
    canActivate: [IngresadoGuard]
  },
  {
    path: 'crear-cliente',
    loadChildren: () => import('./Clientes/crear-cliente/crear-cliente.module').then( m => m.CrearClientePageModule),
    canActivate: [NoIngresadoGuard]
  },
  {
    path: 'modificar-cliente/:idCliente',
    loadChildren: () => import('./Clientes/modificar-cliente/modificar-cliente.module').then( m => m.ModificarClientePageModule),
    canActivate: [IngresadoGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
