import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/config/config';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private platform: Platform,
    public storage: Storage,
    private router: Router
  ) { }
  // login user
  login(user: any): Observable<any> {
    const url = URL_SERVICE + '/login';
    return this.http.post(url, user)
      .pipe(map((resp: any) => {
        if (resp.ok) {
          this.guardarUsuario(resp.user);
          return resp.user
        } else {
          return resp.message;
        }
      }))
  }
  // Almacener usuario en LocalStorage en Web y ionic Storage en movil
  guardarUsuario(user: any) {
    if (this.platform.is('cordova')) {
      this.storage.set('user', user);
      this.router.navigate(['/home']);
    } else {
      localStorage.setItem('user', JSON.stringify(user))
      this.router.navigate(['/home']);
    }
  }

  // Comprobar si esta Loogged. No permiso al Login
  isLogged() {
    let logged = localStorage.key(0);
    if (!isNullOrUndefined(logged)) {
      return true;
    }
  }
  // Comprobar si no esta logged. No permiso al Home
  isNotLogged() {
    let logged = localStorage.key(0);
    if (isNullOrUndefined(logged)) {
      return true;
    }
  }

}


