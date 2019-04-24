import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/config/config';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public users: any[];
  public device: any;
  constructor(private http: HttpClient, private platform: Platform, public storage: Storage) { }

  // Obtener todos los usuarios
  obternerUsuarios(): Observable<any> {
    const url = URL_SERVICE + '/users';
    return this.http.get(url)
      .pipe(map((users: any) => {
        if (users.ok) {
          this.users = [...users.user];
          let currentUser = JSON.parse(localStorage.getItem('user'));
          let usuariosActivados = this.users.filter(users => {
            if (users.activado != 1 && users.id !== currentUser.id) return users
          });
          return usuariosActivados
        } else {
          return users.message;
        }
      }));
  }
}
