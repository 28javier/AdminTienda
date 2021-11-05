import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductosService } from 'src/app/services/productos.service';
import { GLOBAL } from '../../../services/global';
import { Workbook } from "exceljs";
import * as fs from "file-saver";
declare let iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public loadingData: Boolean = true;
  public filtro: any = '';
  public token: any;
  public productos: Array<any> = [];
  public url: any;
  public page = 1;
  public pageSize = 10;
  public arr_productos: Array<any> = [];

  constructor(
    private _productoService: ProductosService,
    private _adminService: AdminService
  ) {
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.listar_productos();
  }


  listar_productos() {
    this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
      resp => {
        // console.log(resp);
        this.productos = resp.data;
        this.loadingData = false;
        this.productos.forEach(e => {
          this.arr_productos.push({
            titulo: e.titulo,
            stock: e.stock,
            precio: e.precio,
            categoria: e.categoria,
            nventas: e.nventas,
          });
        });
        // console.log(this.arr_productos);

      }, error => {
        console.log(error);

      });
  }

  filtrar() {
    if (this.filtro) {
      this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
        resp => {
          // console.log(resp);
          this.productos = resp.data;
          this.loadingData = false;
        }, error => {
          console.log(error);
        });
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        color: 'red',
        // animateInside: true,
        message: 'Ingrese un filtro para Buscar'
      });
    }
  }

  reset() {
    this.filtro = '';
    this.listar_productos();
  }

  eliminarProducto(id: any) {
    // this.load_btn = true;
    this._productoService.eliminar_producto_admin(id, this.token).subscribe(
      resp => {
        // console.log(resp);
        iziToast.show({
          title: 'Success',
          titleColor: 'FF0000',
          class: 'text-danger',
          color: 'green',
          position: 'topRight',
          message: resp.message
        });
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');
        // this.load_btn = false;
        this.listar_productos();
      },
      error => {
        console.log(error);
        // this.load_btn = false;
        iziToast.show({
          title: 'ERROR',
          titleColor: 'red',
          class: 'text-red',
          position: 'topRight',
          color: 'red',
          message: 'No se pudo Eliminar el Producto. ERRROR DEL SERVIDOR'
        });
      }
    );

  }

  download_excel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");
    worksheet.addRow(undefined);
    for (let x1 of this.arr_productos) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
    let fname = 'REP01- ';
    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30 },
      { header: 'Stock', key: 'col2', width: 15 },
      { header: 'Precio', key: 'col3', width: 15 },
      { header: 'Categoria', key: 'col4', width: 25 },
      { header: 'N° ventas', key: 'col5', width: 15 },
    ] as any;
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }


}
