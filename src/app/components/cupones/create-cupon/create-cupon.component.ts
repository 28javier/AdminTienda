import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
declare let iziToast: any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {

  public cupon: any = {
    tipo: ''
  }
  public token: any;

  constructor(private _cuponService: CuponService,
    private _adminService: AdminService, private _router: Router) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }


  registroCupon(registroCuponForms: any) {
    if (registroCuponForms.valid) {
      console.log(this.cupon);
      this._cuponService.registro_cupon_admin(this.cupon, this.token).subscribe(
        resp => {
          // console.log(resp);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: 'green',
            class: 'text-green',
            position: 'topRight',
            color: 'green',
            message: resp.message
          });
          this._router.navigate(['/panel/cupones']);
        }, error => {
          console.log(error);
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        color: 'red',
        message: 'Datos Invalidos'
      });
    }
  }

}
