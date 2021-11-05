import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  public url: any;
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  // getClientes(tipo: any, filtro: any, token: any): Observable<any> {
  //   let headers = new HttpHeaders({ 'Content-Type': 'aplication/json', 'Authorization': token });
  //   return this._http.get(this.url + 'clientes' + `/${tipo}/${filtro}`, { headers: headers });
  // }

  listar_clientes_filtro_admin(tipo: any, filtro: any, token: any): Observable<any> {
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'listar_clientes_filtro_admin/' + tipo + '/' + filtro, { headers: headers });
  }


  // createClientes(data: any): Observable<any> {
  //   // let headers = new HttpHeaders({ 'Content-Type': 'aplication/json', 'Authorization': token });
  //   return this._http.post(this.url + 'clientes/crearCliente', data);
  // }

  registro_cliente_admin(data: any, token: any): Observable<any> {
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.post(this.url + 'registro_cliente_admin/', data, { headers: headers });
  }


  // byIdClientes(id: any, token: any): Observable<any> {
  //   let headers = new HttpHeaders({ 'Content-Type': 'aplication/json', 'Authorization': token });
  //   return this._http.get(this.url + 'clientes/' + id, { headers });
  // }

  obtener_cliente_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_cliente_admin/' + id, { headers: headers });
  }

  // modificarClientes(id: any, data: any): Observable<any> {
  //   // let headers = new HttpHeaders({ 'Content-Type': 'aplication/json', 'Authorization': token });
  //   return this._http.put(this.url + 'clientes/' + id, data);
  // }

  actualizar_cliente_admin(id: any, data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'actualizar_cliente_admin/' + id, data, { headers: headers });
  }


  // deleteClientes(id: any, token: any): Observable<any> {
  //   let headers = new HttpHeaders({ 'Content-Type': 'aplication/json', 'Authorization': token });
  //   return this._http.delete(this.url + 'clientes/' + id, { headers });
  // }

  eliminar_cliente_admin(id: any, token: any): Observable<any> {
    // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.delete(this.url + 'eliminar_cliente_admin/' + id, { headers: headers });
  }

}
