import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  public messages: Array<any> = [];

  constructor(private http: HttpClient, private platform: Platform, private storage: Storage) { }
  // Obtener todos los mensajes del chat entre dos usuarios
  getChat(transmitter: any, receiver: any): Observable<any> {
    const url = URL_SERVICE + '/chat';
    return this.http.post(url, { transmitter, receiver })
      .pipe(map((resp: any) => {
        if (resp.ok) {
          this.messages = [...resp.messages];
          return resp.messages;
        }
      }));
  }
  // Obtener todos los mensajes de emisor
  mensajeRecivido() {
    const url = URL_SERVICE + '/recivido';
    return this.http.get(url)
    .pipe(map((message: any) => message.message))
  }
  // Enviar mensaje
  sendMessage(transmitter: any, message: string, receiver: any, grupo: number) {
    const url = URL_SERVICE + '/envio';
    return this.http.post(url, { transmitter, message, receiver, grupo })
      .pipe(map((resp: any) => {
        // console.log(resp);
      }))
  }

}






