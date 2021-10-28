import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { NgbModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from './app-routing.module';
// importacion de archivo de rutas
import { routing } from './app.routing';
// componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FiltrarClienteComponent } from './components/clientes/filtrar-cliente/filtrar-cliente.component';
import { CrearClienteComponent } from './components/clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './components/clientes/editar-cliente/editar-cliente.component'

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    FiltrarClienteComponent,
    CrearClienteComponent,
    EditarClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // HttpClient,
    HttpClientModule,
    routing,
    // NgbModule,
    NgbPaginationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
