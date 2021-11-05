import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { AdminService } from '../../../services/admin.service';
import { GLOBAL } from '../../../services/global';
import { ConfigService } from '../../../services/config.service';
declare let iziToast: any;
declare let jQuery: any;
declare let $: any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto: any = {};
  public config: any = {};
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public id: any;
  public token: any;
  public url: any;
  public file: any = undefined;
  public dataCategoria: any = {}


  constructor(private _route: ActivatedRoute, private _productoService: ProductosService, private _adminService: AdminService, private _configService: ConfigService, private _router: Router) {
    this.config = {
      height: 500
    }
    this.token = this._adminService.getToken();
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
              this.imgSelect = this.url + 'obtener_portada/' + this.producto.portada;
            }
          }, error => {
            console.log(error);
          });
      }
    );
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this._configService.obtener_config_publico().subscribe(
      resp => {
        // console.log(resp);
        this.dataCategoria = resp.data;
        // console.log(this.dataCategoria);

      }, error => {
        console.log(error);
      }
    )
  }

  actualizarProducto(formProductoActualizar: any) {
    if (formProductoActualizar.valid) {
      // console.log(this.producto);
      // console.log(this.file);
      var data: any = {};
      if (this.file != undefined) {
        data.portada = this.file;
      }
      data.titulo = this.producto.titulo;
      data.stock = this.producto.stock;
      data.precio = this.producto.precio;
      data.categoria = this.producto.categoria;
      data.descripcion = this.producto.descripcion;
      data.contenido = this.producto.contenido;
      // this.load_btn = true;
      this._productoService.actualizar_producto_admin(data, this.id, this.token).subscribe(
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
          // this.load_btn = true;
          this._router.navigate(['/panel/productos']);
        }, error => {
          console.log(error);
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        class: 'text-red',
        position: 'topRight',
        color: 'red',
        message: 'Todos los campos del formulario debes llenarlos'
      });
    }
  }

  fileChangeEvent(event: any): void {
    var file: any;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];
      // console.log(file);
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        color: 'red',
        // animateInside: true,
        message: 'No hay Imagen de Envio'
      });
      $('#input-portada').text('Seleccionar Imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    if (file.size <= 4000000) {
      if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/git' || file.type == 'image/jpeg') {
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        // console.log(this.imgSelect);
        reader.readAsDataURL(file);
        $('#input-portada').text(file.name);
        this.file = file;
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: 'red',
          class: 'text-danger',
          position: 'topRight',
          color: 'red',
          // animateInside: true,
          message: 'El archivo no cumple las siguientes extensiones permitidas PNG/WEBP/JPG/GIT/JPEG'
        });
        $('#input-portada').text('Seleccionar Imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        color: 'red',
        message: 'La Imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar Imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    // console.log(this.file);
  }
}
