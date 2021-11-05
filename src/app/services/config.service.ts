import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public url: any;
  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }


  actualizar_config_admin(id: any, data: any, token: any): Observable<any> {
    if (data.logo) {
      let headers = new HttpHeaders({ 'Authorization': token });

      const fd = new FormData();

      fd.append('titulo', data.titulo);
      fd.append('serie', data.serie);
      fd.append('correlativo', data.correlativo);
      fd.append('categorias', JSON.stringify(data.categorias));
      fd.append('logo', data.logo);

      return this._http.put(this.url + 'actualizar_config_admin/' + id, fd, { headers: headers });
    } else {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
      return this._http.put(this.url + 'actualizar_config_admin/' + id, data, { headers: headers });
    }

  }

  obtener_config_admin(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'obtener_config_admin/', { headers: headers });
  }

  // obtener_config_publico
  obtener_config_publico(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.get(this.url + 'obtener_config_publico', { headers: headers });
  }

}
