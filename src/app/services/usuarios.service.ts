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
  public usuarios: any[];
  public device: any;
  constructor(private http: HttpClient, private platform: Platform, public storage: Storage) { }

  // Obtener todos los usuarios
  obternerUsuarios(): Observable<any> {
    const url = URL_SERVICE + '/users';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        if (resp.ok) {
          // si es movil
          if (this.platform.is('cordova')) {
            this.storage.get('user')
              .then((value: any) => {
                this.device = value.device;
                // console.log("device cordova", value.device);
              })
          }
          // si es web
          this.usuarios = [...resp.user];
          let currentUser = JSON.parse(localStorage.getItem('user'));
          let usuariosActivados = this.usuarios.filter(usuario => {
            if (usuario.activado != 1 && usuario.id !== currentUser.id) return true
          });
          return usuariosActivados

        } else {
          return resp.message;
        }
      }));
  }
}
