import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url: any;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;

  }

  public isAuthenticated(allowRoles: string[]): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(<any>token);
      // console.log(decodedToken);

      if (!decodedToken) {
        console.log('NO ACCESO RESTRINCION POR EL TOKEN');
      }
    } catch (error) {
      localStorage.removeItem('token');
      return false;
    }
    return allowRoles.includes(decodedToken['rol']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  login_admin(data: any): Observable<any> {
    // let headers = new HttpHeaders().set('Content-Type', 'aplication/json');
    return this._http.post(this.url + 'admins/loginAdmin', data);
  }

}
