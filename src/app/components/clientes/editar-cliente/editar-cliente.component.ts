import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClientesService } from '../../../services/clientes.service';

declare let iziToast: any;

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  public cliente: any = {
    genero: ''
  };
  public id: any;
  public token: any;
  // public loadingData: boolean = false;
  public loadingDataTabla: boolean = true;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClientesService,
    private _adminService: AdminService) {

    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        // console.log(this.id);
        this._clienteService.obtener_cliente_admin(this.id, this.token).subscribe(
          resp => {
            // console.log(resp);
            if (resp.data == undefined) {
              this.cliente = undefined;
              this.loadingDataTabla = false;
            } else {
              this.cliente = resp.data;
              this.loadingDataTabla = false;
            }
          }, error => {
            console.log(error);
          }
        )
      }
    )
  }


  updateCliente(updateClienteForms: any) {

    if (updateClienteForms.valid) {
      // this.loadingData = true;
      this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(
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
          this._router.navigate(['/panel/clientes']);
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
        // animateInside: true,
        message: 'Datos Invalidos'
      });
    }
  }

}
