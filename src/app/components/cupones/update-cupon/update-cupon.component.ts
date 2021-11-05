import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from '../../../services/cupon.service';
import { AdminService } from '../../../services/admin.service';
declare let iziToast: any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent implements OnInit {

  public cupon: any = {
    tipo: ''
  }
  public id: any;
  public token: any;
  // public loadingData: boolean = false;
  public loadingDataTabla: boolean = true;


  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _cuponService: CuponService,
    private _adminService: AdminService) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        // console.log(this.id);
        this._cuponService.obtener_cupon_admin(this.id, this.token).subscribe(
          resp => {
            // console.log(resp);
            if (resp.data == undefined) {
              this.cupon = undefined;
              this.loadingDataTabla = false;
            } else {
              this.cupon = resp.data;
              this.loadingDataTabla = false;
            }
          }, error => {
            console.log(error);
          }
        )
      });
  }




  editarCupon(editarCuponForms: any) {
    if (editarCuponForms.valid) {
      // console.log(this.cupon);
      this._cuponService.actualizar_cupon_admin(this.id, this.cupon, this.token).subscribe(
        resp => {
          // console.log(resp);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: 'green',
            class: 'text-green',
            position: 'topRight',
            color: 'green',
            // animateInside: true,
            message: resp.message
          });
          // this.loadingData = false;
          this._router.navigate(['/panel/cupones']);
        }, error => {
          console.log(error);
          iziToast.show({
            title: 'ERROR',
            titleColor: 'red',
            class: 'text-danger',
            position: 'topRight',
            color: 'red',
            // animateInside: true,
            message: error.error.message
          });
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
