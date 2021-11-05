import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ConfigService } from 'src/app/services/config.service';
import { v4 as uuidv4 } from 'uuid';
import { GLOBAL } from '../../services/global';
declare let iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token;
  public config: any = {};
  public url: any;
  public titulo_cat = '';
  public icono_cat = '';
  public file: any = undefined;
  public imgSelect: any | ArrayBuffer;

  constructor(
    private _adminService: AdminService,
    private _configService: ConfigService,
  ) {
    this.token = this._adminService.getToken();
    this.url = GLOBAL.url
    this._configService.obtener_config_admin(this.token).subscribe(
      response => {
        // console.log(response);
        this.config = response.data;
        this.imgSelect = this.url + 'obtener_logo/' + this.config.logo;
        // console.log(this.config);

      },
      error => {
        console.log(error);

      }
    );
  }

  ngOnInit(): void {
  }

  actualizar(confForm: any) {
    if (confForm.valid) {
      let data = {
        titulo: confForm.value.titulo,
        serie: confForm.value.serie,
        correlativo: confForm.value.correlativo,
        categorias: this.config.categorias,
        logo: this.file
      }
      // console.log(data);
      this._configService.actualizar_config_admin("6182f0e9f91297cb2f238421", data, this.token).subscribe(
        response => {
          // console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: 'green',
            color: 'green',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizó correctamente la configuración'
          });

        }
      )

    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        color: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete correctamente el formulario'
      })
    }
  }

  agregar_cat() {
    if (this.titulo_cat && this.icono_cat) {
      // console.log(uuidv4());
      this.config.categorias.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4()
      })
      this.titulo_cat = '';
      this.icono_cat = '';
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'FF0000',
        class: 'text-danger',
        color: 'red',
        position: 'topRight',
        message: 'debe ingresar un titulo e icono para las categorias'
      });
    }

  }
  fileChangeEvent(event: any) {
    var file;
    if (event.target.files && event.target.files[0]) {
      file = <any>event.target.files[0];
      //console.log(file);
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        color: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen de envio'
      });
    }
    if (file.size <= 4000000) {
      if (file.type == 'image/png' ||
        file.type == 'image/webp' ||
        file.type == 'image/jpg' ||
        file.type == 'image/gif' ||
        file.type == 'image/jpeg') {

        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        reader.readAsDataURL(file);
        $('#input-portada').text(file.name);
        this.file = file;
      } else {
        iziToast.show({
          title: 'Error',
          titleColor: 'red',
          color: 'red',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen'
        });
        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        color: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4mb'
      });
      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
    console.log(this.file);
  }

  ngDoCheck(): void {
    $('.cs-file-drop-preview').html("<img src=" + this.imgSelect + ">");
  }


  eliminar_categoria(idx: any) {
    this.config.categorias.splice(idx, 1);
  }


}
