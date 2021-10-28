import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
declare let jQuery: any;
declare let $: any;
declare let iziToast: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: any = {
    // email: '',
    // password: ''
  }
  public usuario: any = {}
  public token: any = '';


  constructor(private _adminService: AdminService, private _router: Router) {

    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    // console.log(this.token);
    if (this.token) {
      this._router.navigate(['/']);
    } else {
      // Mantener en el Componente
    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      // console.log(this.user);
      // alert('Si es valido')
      let data = {
        email: this.user.email,
        password: this.user.password
      }
      this._adminService.login_admin(data).subscribe(
        response => {
          // console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: 'green',
            class: 'text-green',
            position: 'topRight',
            color: 'green',
            // animateInside: true,
            message: response.message
          });
          this.usuario = response.data;
          localStorage.setItem('token', response.token);
          localStorage.setItem('_id', response.data._id);
          this._router.navigate(['/'])

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
      // alert('No es valido')
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        color: 'red',
        // animateInside: true,
        message: 'Los datos del formulario no son validos'
      });
    }
  }

}
