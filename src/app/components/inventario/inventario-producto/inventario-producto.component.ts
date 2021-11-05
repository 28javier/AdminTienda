import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/global';
import { ProductosService } from 'src/app/services/productos.service';
import { Workbook } from "exceljs";
import * as fs from "file-saver";
declare let iziToast: any;
declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public producto: any = {};
  public inventarios: Array<any> = [];
  public arr_inventarios: Array<any> = [];
  public inventario: any = {}
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public id: any;
  public token: any;
  public _idUser: any;
  public url: any;



  constructor(private _route: ActivatedRoute, private _productoService: ProductosService, private _adminService: AdminService, private _router: Router) {
    this.token = this._adminService.getToken();
    this._idUser = localStorage.getItem('_id');
    console.log(this._idUser);
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        // console.log(this.id);
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          resp => {
            // console.log(resp);
            if (resp.data == undefined) {
              this.producto = undefined;
            } else {
              this.producto = resp.data

              this.obtenerInventario();
            }
          }, error => {
            console.log(error);
          });
      }
    )
  }

  obtenerInventario() {
    this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
      resp => {
        // console.log(resp);
        this.inventarios = resp.data;
        this.inventarios.forEach(e => {
          this.arr_inventarios.push({
            admin: e.admin.nombres + ' ' + e.admin.apellidos,
            cantidad: e.cantidad,
            proveedor: e.proveedor
          })
        });
        console.log(this.arr_inventarios);
      }, error => {
        console.log(error);

      });
  }

  eliminarInventario(id: any) {
    // this.load_btn = true;
    this._productoService.eliminar_inventario_producto_admin(id, this.token).subscribe(
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
        this.obtenerInventario();
        // this._productoService.listar_inventario_producto_admin(this.producto._id, this.token).subscribe(
        //   resp => {
        //     // console.log(resp);
        //     this.inventarios = resp.data;
        //   }, error => {
        //     console.log(error);

        //   });
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
          message: 'No se pudo Eliminar el Inventario de este Producto. ERRROR DEL SERVIDOR'
        });
      }
    );
  }

  registro_inventario(inventarioForm: any) {
    if (inventarioForm.valid) {
      // console.log(this.inventario);
      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._idUser,
        proveedor: inventarioForm.value.proveedor,
      }
      // console.log(data);
      this._productoService.registro_inventario_producto_admin(data, this.token).subscribe(
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
          this.inventario = {
            cantidad: '',
            proveedor: ''
          }
          this.obtenerInventario();
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
        // animateInside: true,
        message: 'Todos los campos del formulario debes llenarlos'
      });
    }
  }

  download_excel() {
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");
    worksheet.addRow(undefined);
    for (let x1 of this.arr_inventarios) {
      let x2 = Object.keys(x1);
      let temp = []
      for (let y of x2) {
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
    let fname = 'REP-Inventario-01- ';
    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30 },
      { header: 'Cantidad', key: 'col2', width: 15 },
      { header: 'Proveedor', key: 'col3', width: 25 },
    ] as any;
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
