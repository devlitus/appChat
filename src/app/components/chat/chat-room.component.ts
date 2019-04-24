import { Component, OnInit, ViewChild } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IonInput } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('inpMessage') inpMessage: IonInput;
  public messages = [];
  public uerId = this.activateRouter.snapshot.paramMap.get('id');
  public nameUser = this.activateRouter.snapshot.paramMap.get('username');
  public currentUser = JSON.parse(localStorage.getItem('user'));
  public subscription: Subscription;
  public contador = 0;
  public interval: any;
  constructor(private _service: MensajesService, public activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.showChat();
      this.contador++
      if (this.contador === 1000) {
        clearInterval(this.interval)
      }
    }, 3000);
  }
  ionViewWillEnter() {
    this.showChat();
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }
  // Mostrar todos los mensajes
  showChat() {
    this.subscription = this._service.getChat(this.currentUser.id, this.uerId)
      .subscribe(
        messages => { this.messages = [...messages]; },
        error => console.error('Error observable', error),
        () => console.log('mensaje recivido completado')
      )
  }
  // Recibir un solo mensaje esta de pruebas
  /* messageReceiver() {
    this._service.mensajeRecivido()
      .subscribe(
        () => { message => this.messages.push(message) }
        , error => console.error("Error obs recivir mensaje", error)
        , () => console.log('completo'))
  } */
  // Enviar mensaje
  send(message: string) {
    let grupo = 1;
    if (message !== '') {
      this._service.sendMessage(this.currentUser.id, message, this.uerId, grupo)
        .subscribe(
          () => {
            this.showChat();
            this.inpMessage.value = '';
          },
          error => console.error("error obs", error),
          () => console.log("envio mensaje complete")
        );
    }
  }

}
