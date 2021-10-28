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

  getClientes(tipo: any, filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'aplication/json', 'Authorization': token });
    return this._http.get(this.url + 'clientes' + `/${tipo}/${filtro}`, { headers: headers });
  }

  createClientes(data: any): Observable<any> {
    // let headers = new HttpHeaders({ 'Content-Type': 'aplication/json', 'Authorization': token });
    return this._http.post(this.url + 'clientes/crearCliente', data);
  }

  byIdClientes(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'aplication/json', 'Authorization': token });
    return this._http.get(this.url + 'clientes/' + id, { headers });
  }

  modificarClientes(id: any, data: any): Observable<any> {
    // let headers = new HttpHeaders({ 'Content-Type': 'aplication/json', 'Authorization': token });
    return this._http.put(this.url + 'clientes/' + id, data);
  }

  deleteClientes(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'aplication/json', 'Authorization': token });
    return this._http.delete(this.url + 'clientes/' + id, { headers });
  }
}
