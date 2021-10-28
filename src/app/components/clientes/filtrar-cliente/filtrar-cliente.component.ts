import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClientesService } from 'src/app/services/clientes.service';
declare let iziToast: any;
declare let jQuery: any;
declare let $: any;
@Component({
  selector: 'app-filtrar-cliente',
  templateUrl: './filtrar-cliente.component.html',
  styleUrls: ['./filtrar-cliente.component.css']
})
export class FiltrarClienteComponent implements OnInit {

  public clientes: Array<any> = [];
  public filtrar_Apellidos = '';
  public filtrar_Correo = '';
  public page = 1;
  public pageSize = 5;
  public token: any;
  public loadingData: boolean = true;

  constructor(private _clienteService: ClientesService,
    private _adminService: AdminService) {
    this.token = this._adminService.getToken();
    // console.log(this.token);

  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this._clienteService.getClientes(null, null, this.token).subscribe(
      res => {
        // console.log(res);
        this.clientes = res.clientes;
        // console.log(this.clientes);
        this.loadingData = false;
      }, error => {
        console.log(error);
      }
    )
  }

  filtro(tipo: any) {
    // console.log(tipo);
    // console.log(this.filtrar_Apellidos);
    // console.log(this.filtrar_Correo);
    if (tipo == 'apellidos') {
      if (this.filtrar_Apellidos) {
        this.loadingData = true;
        this._clienteService.getClientes(tipo, this.filtrar_Apellidos, this.token).subscribe(
          res => {
            // console.log(res);
            this.clientes = res.clientes;
            // console.log(this.clientes);
            this.loadingData = false;
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.getClientes();
      }
    } else if (tipo == 'correo') {
      if (this.filtrar_Correo) {
        this.loadingData = true;
        this._clienteService.getClientes(tipo, this.filtrar_Correo, this.token).subscribe(
          res => {
            // console.log(res);
            this.clientes = res.clientes;
            // console.log(this.clientes);
            this.loadingData = false;
          }, error => {
            console.log(error);
          }
        );
      } else {
        this.getClientes();
      }
    }

  }
  eliminarCliente(id: any) {
    this._clienteService.deleteClientes(id, this.token).subscribe(
      resp => {
        console.log(resp);
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
        this.getClientes();
      }, error => {
        console.log(error);

      }
    )
  }

}
