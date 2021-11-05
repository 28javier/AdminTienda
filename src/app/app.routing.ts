import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { FiltrarClienteComponent } from './components/clientes/filtrar-cliente/filtrar-cliente.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './components/clientes/editar-cliente/editar-cliente.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { IndexProductoComponent } from './components/productos/index-producto/index-producto.component';
import { UpdateProductoComponent } from './components/productos/update-producto/update-producto.component';
import { InventarioProductoComponent } from './components/inventario/inventario-producto/inventario-producto.component';
import { CreateCuponComponent } from './components/cupones/create-cupon/create-cupon.component';
import { IndexCuponComponent } from './components/cupones/index-cupon/index-cupon.component';
import { UpdateCuponComponent } from './components/cupones/update-cupon/update-cupon.component';
import { ConfigComponent } from './components/config/config.component';
import { VariedadProductoComponent } from './components/productos/variedad-producto/variedad-producto.component';
import { GaleriaProductoComponent } from './components/productos/galeria-producto/galeria-producto.component';

const appRoter: Routes = [

    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: InicioComponent, canActivate: [AdminGuard] },
    { path: 'login', component: LoginComponent },
    {
        path: 'panel', children: [
            { path: 'clientes', component: FiltrarClienteComponent, canActivate: [AdminGuard] },
            { path: 'crear-clientes', component: CrearClienteComponent, canActivate: [AdminGuard] },
            { path: 'editar-cliente/:id', component: EditarClienteComponent, canActivate: [AdminGuard] },

            { path: 'productos', component: IndexProductoComponent, canActivate: [AdminGuard] },
            { path: 'productos/registro', component: CreateProductoComponent, canActivate: [AdminGuard] },
            { path: 'productos/editar/:id', component: UpdateProductoComponent, canActivate: [AdminGuard] },
            { path: 'productos/inventario/:id', component: InventarioProductoComponent, canActivate: [AdminGuard] },
            { path: 'productos/variedades/:id', component: VariedadProductoComponent, canActivate: [AdminGuard] },
            { path: 'productos/galeria/:id', component: GaleriaProductoComponent, canActivate: [AdminGuard] },

            { path: 'cupones', component: IndexCuponComponent, canActivate: [AdminGuard] },
            { path: 'cupones/registro', component: CreateCuponComponent, canActivate: [AdminGuard] },
            { path: 'cupones/editar/:id', component: UpdateCuponComponent, canActivate: [AdminGuard] },


            { path: 'configuraciones', component: ConfigComponent, canActivate: [AdminGuard] },

        ]
    }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoter);
