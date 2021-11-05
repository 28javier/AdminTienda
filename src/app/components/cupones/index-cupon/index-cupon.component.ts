import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { CuponService } from 'src/app/services/cupon.service';
declare let iziToast: any;
declare let jQuery: any;
declare let $: any;
@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {
  public cupones: Array<any> = [];
  public loadingData: boolean = true;
  public page = 1;
  public pageSize = 5;
  public filtro = '';
  public token: any;

  constructor(private _cuponService: CuponService,
    private _adminService: AdminService) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.getCupones();
  }

  getCupones() {
    this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(
      resp => {
        // console.log(resp);
        this.cupones = resp.data;
        this.loadingData = false;
      }, error => {
        console.log(error);
      }
    )
  }


  filtrar() {
    this.getCupones();
  }

  reset() {
    this.filtro = '';
    this.getCupones();
  }


  eliminarCupon(id: any) {
    this._cuponService.eliminar_cupon_admin(id, this.token).subscribe(
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
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        this.getCupones();
      }, error => {
        console.log(error);

      }
    )
  }
}
