import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { Router } from '@angular/router';
declare let iziToast: any;
@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  public cliente: any = {
    genero: ''
  };
  public token;
  public loadingData: boolean = false;


  constructor(private _clienteService: ClientesService,
    private _adminService: AdminService,
    private _router: Router) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
  }

  registroCliente(registroClienteForms: any) {
    if (registroClienteForms.valid) {
      // console.log(this.cliente);
      this.loadingData = true;
      this._clienteService.createClientes(this.cliente).subscribe(
        res => {
          // console.log(res);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: 'green',
            class: 'text-green',
            position: 'topRight',
            color: 'green',
            // animateInside: true,
            message: res.message
          });
          this.loadingData = false;
          this._router.navigate(['/panel/clientes']);
        }, error => {
          // console.log(error);
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
