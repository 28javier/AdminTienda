import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private _adminService: AdminService,
    private _router: Router) {

  }
  canActivate(): any {
    console.log('CanActiveFuncionando');
    // return true;
    if (!this._adminService.isAuthenticated(['Admin-Rol'])) {
      this._router.navigate(['/login'])
      return false;
    }
    return true;

  }

}
