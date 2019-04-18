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
export class MensajesService {

  constructor(private http: HttpClient, private platform: Platform, private storage: Storage) { }
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
  // Obtener todos los mensajes de emisor
  mensajeRecivido(): Observable<any> {
    const url = URL_SERVICE + '/recivido';
    return this.http.get(url)
      .pipe(map((res: any) => {
        if (res.ok) return res.message;
      }))
  }
  // Enviar mensaje
  enviarMensaje(transmitter: number, message: string, receiver: any, grupo = 1): Observable<any> {
    const url = URL_SERVICE + '/envio';
    return this.http.post(url, { transmitter, message, receiver, grupo })
      .pipe(map((resp) => {
        console.log(resp);
      }))
  }

}






