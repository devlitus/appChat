import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/config/config';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private platform: Platform) { }
  // Obtener todos los usuarios
  obternerUsuarios(): Observable<any> {
    const url = URL_SERVICE + '/users';
    return this.http.get(url)
      .pipe(map((resp: any) => {
        if (this.platform.is('cordova')) {
          // si es movil
          
        }else {
          // si es web
          if (resp.ok) {
            let usuarios = [...resp.user];
            let currentUser = JSON.parse(localStorage.getItem('user'));
            let usuariosActivados = usuarios.filter(usuario => {
              if (usuario.activado != 1 && usuario.id !== currentUser.id) return true
            });
            return usuariosActivados
          } else {
            return resp.message;
          }
        }
      }));
  }
}
