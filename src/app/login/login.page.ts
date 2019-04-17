import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private _loginService: LoginService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.valid) {
      let user = {
        name: form.value.nombre,
        password: form.value.password
      }
      this._loginService.login(user)
      .subscribe((res) => console.log(res))
    }
  }

}
