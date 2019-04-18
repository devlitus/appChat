import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-room-chat',
  templateUrl: './room-chat.page.html',
  styleUrls: ['./room-chat.page.scss'],
})
export class RoomChatPage implements OnInit {
  public emisor: any = JSON.parse(localStorage.getItem('user'));
  public receptor: any = this.activateRouter.snapshot.paramMap.get('id');
  public nombre: any = this.activateRouter.snapshot.paramMap.get('nombre');
  public mensajes: any = [];
  constructor(
    public activateRouter: ActivatedRoute,
    public router: Router,
    public mensajeService: MensajesService,
    public platform: Platform,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.roomChat()
  }
  roomChat() {
    let emisor = JSON.parse(localStorage.getItem('user'));
    let receptor = this.activateRouter.snapshot.paramMap.get('id');
    this.mensajeService.chat(emisor.id, receptor)
      .subscribe(resp => {
        this.mensajes = [...resp];
        console.log(resp);
      })
  }
  enviarMensaje(mensaje: string) {
    if (mensaje !== '') {
      this.mensajeService.enviarMensaje(this.emisor.id, mensaje, this.receptor)
        .subscribe(() => this.roomChat());
    }
  }

}











/* roomChat() {
  this.receptor = this.activateRouter.snapshot.paramMap.get('id');
  // si es movil
  if (this.platform.is('cordova')) {
    this.storage.get('user').then((emisor: any) => {
      this.mensajeService.chat(this.receptor, emisor.id)
        .subscribe(resp => {
          // this.mensajes = [...resp];
        })
    });
  }
  // si es web
  this.emisor = JSON.parse(localStorage.getItem('user'));
  this.mensajeService.chat(this.receptor, this.emisor.id)
    .pipe(retry(3))
    .subscribe(resp => {
      this.mensajes = [...resp];
    },
      error => console.error("Error en observable", error)
    );
}

enviarMensaje(mensajeEnviar: string) {
  if (mensajeEnviar !== '') {

    // this.router.navigate([['/room-chat/', 2 ]])
  }
} */