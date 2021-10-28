import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { FiltrarClienteComponent } from './components/clientes/filtrar-cliente/filtrar-cliente.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './components/clientes/editar-cliente/editar-cliente.component';

const appRoter: Routes = [

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: InicioComponent, canActivate: [AdminGuard] },
    { path: 'login', component: LoginComponent },
    {
        path: 'panel', children: [
            { path: 'clientes', component: FiltrarClienteComponent, canActivate: [AdminGuard] },
            { path: 'crear-clientes', component: CrearClienteComponent, canActivate: [AdminGuard] },
            { path: 'editar-cliente/:id', component: EditarClienteComponent, canActivate: [AdminGuard] },
        ]
    }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoter);
