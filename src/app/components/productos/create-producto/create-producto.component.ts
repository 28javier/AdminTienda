import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config.service';
declare let iziToast: any;
declare let jQuery: any;
declare let $: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public producto: any = {
    categoria: ''
  }
  public file: any = undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public config: any = {}
  public token: any;
  public load_btn: Boolean = false;
  public dataCategoria: any = {}

  constructor(private _productoService: ProductosService, private _adminService: AdminService,
    private _configService: ConfigService,
    private _router: Router) {
    this.config = {
      height: 500
    }
    this.token = this._adminService.getToken();
    this.obtenerCategorias();
  }

  ngOnInit(): void {
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
  registroProducto(formProducto: any) {
    if (formProducto.valid) {
      if (this.file == undefined) {
        iziToast.show({
          title: 'ERROR',
          titleColor: 'red',
          class: 'text-danger',
          position: 'topRight',
          color: 'red',
          message: 'Debes subir una Imagen para poder registrar el formulario'
        });
      } else {
        // console.log(this.producto);
        // console.log(this.file);
        this.load_btn = true;
        this._productoService.registro_producto_admin(this.producto, this.file, this.token).subscribe(
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
            this.load_btn = true;
            this._router.navigate(['/panel/productos']);
          }, error => {
            console.log(error);
            this.load_btn = true;

          });
      }
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
      this.load_btn = true;

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
        // animateInside: true,
        message: 'La Imagen no puede superar los 4MB'
      });
      $('#input-portada').text('Seleccionar Imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    // console.log(this.file);
  }
}
