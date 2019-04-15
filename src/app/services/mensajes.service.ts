import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(private http: HttpClient) { }
  // Obtener todos los mensajes del chat entre dos usuarios
  chat(transmitter: any, receiver: any): Observable<any> {
    const url = URL_SERVICE + '/chat';
    return this.http.post(url, { transmitter, receiver })
      .pipe(map((resp: any) => {
        if (resp.ok) {
          return resp.messages;
        }
      }));
  }
  enviarMensaje(): Observable<any> {
    return
  }







  /* // Obtener todos los mensajes de qualquier usuario
  todosMensajes(): Observable<any> {
    const url = URL_SERVICE + '/mensajes'; 
    return this.http.get(url)
    .pipe(map((resp: any) => {
      if (resp.ok) {
        return resp;
      }
    }));
  }

  // Obtener los mensajes de un usuario
  mensjeUsuario(id: any): Observable<any> {
    const url = URL_SERVICE + `/mensaje?id=${id}`;
    return this.http.get(url)
    .pipe(map((resp: any) => {
      if (resp.ok) {
        return resp.mensajes;
      }
    }))
  }
  // Envio de mensajes
  enviarMensaje(mensaje: any, emisorId: any): Observable<any> {
    const url = URL_SERVICE + '/mensaje';
    return this.http.post(url, {emisorId, mensaje})
    .pipe(map((resp: any) => console.log(resp)));
  } */
}
