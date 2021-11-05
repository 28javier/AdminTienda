import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/global';
import { ProductosService } from 'src/app/services/productos.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent implements OnInit {
  public producto: any = {};
  public id: any;
  public token: any;
  public nueva_variedad = '';
  public load_btn = false;
  public url: any;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductosService,
    private _adminService: AdminService) {
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url;
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        //  console.log(this.id);
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response => {
            // console.log(response);
            if (response.data == undefined) {
              this.producto = undefined;
            } else {
              this.producto = response.data;
              // console.log(this.producto);
            }
          },
          error => {
            console.log(error);
          }
        )
      }
    )

  }

  ngOnInit(): void {
  }


  agregar_variedad() {
    if (this.nueva_variedad) {
      // console.log(this.nueva_variedad);
      this.producto.variedades.push({ titulo: this.nueva_variedad });
      this.nueva_variedad = '';
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        color: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'El campo de la variedad debe ser completada'
      })
    }
  }


  eliminar_variedad(idx: any) {
    this.producto.variedades.splice(idx, 1);
  }

  actualizar() {
    if (this.producto.titulo_variedad) {
      if (this.producto.variedades.length >= 1) {
        this.load_btn = true;
        this._productoService.actualizar_producto_variedades_admin({
          titulo_variedad: this.producto.titulo_variedad,
          variedades: this.producto.variedades
        }, this.id, this.token).subscribe(
          response => {
            // console.log(response);
            iziToast.show({
              title: 'SUCCESS',
              titleColor: 'green',
              color: 'green',
              class: 'text-success',
              position: 'topRight',
              message: 'Se actualizó correctamente las variedades'
            });
            this.load_btn = false;
            // this._router.navigate('[]')
            this._router.navigate(['/panel/productos']);
          }
        )
      } else {
        iziToast.show({
          title: 'Error',
          titleColor: 'red',
          color: 'red',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe agregar al menos una variedad'
        })
      }
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        color: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe completar el titulo de la variedad'
      })
    }
  }



}
