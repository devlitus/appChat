import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MensajesService } from '../services/mensajes.service';
import { UsuariosService } from '../services/usuarios.service';
import { Subscription } from 'rxjs';
// Plugins Capacitors
const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public usuarios = [];
  public mensajesRecividos: any;
  public message: any;
  public recivido: boolean = true;
  public currentUser = JSON.parse(localStorage.getItem('user'));
  public subscription: Subscription;
  constructor(
    private _usuarioService: UsuariosService,
    private _mensajeService: MensajesService,
    private router: Router,
    public platform: Platform,
    public storage: Storage,
    private menu: MenuController
  ) { }

  ngOnInit() {
    // console.log('inicio componente');
  }
  // se activa al volver a la pagina
  ionViewWillEnter() {
    this.mostrarUsuarios();
    this.messageReceiver();
    let message = localStorage.getItem('messageTransmitter');
    if (message === this.message) {
      this.recivido = false;
      localStorage.removeItem('messageTransmitter');
    };
    // console.log('ionViewWillEnter');
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
  // Obtener todos los usuarios
  mostrarUsuarios() {
    this._usuarioService.obternerUsuarios()
      .subscribe(usuarios => {
        // console.log(this.currentUser);
        this.usuarios = usuarios;
      },
        error => console.error('Error observable', error),
        () => console.log('completo usuarios')
      );
  }
  messageReceiver() {
    this.subscription = this._mensajeService.mensajeRecivido()
      .subscribe(
        message => {
          this.message = message[0].transmitter;
          localStorage.setItem('messageTransmitter', message[0].transmitter);
        },
        error => console.error("Error en obs mensaje recivido", error),
        () => console.log("completado"));
  }

  notificacion() {
    LocalNotifications.schedule({
      notifications: [
        {
          title: "Mensaje recivido",
          body: `Mensaje de ${this.mensajesRecividos[0].receiver}`,
          id: 1,
          schedule: {},
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
  }
  // Ir al room chat pasandole el id del usuario que quieres enviarle un mensaje
  roomChat(usuarioId: any, nombre: any) {
    this.router.navigate(['/chat/', usuarioId, nombre]);
  }
  // Open Menu
  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}












// at: new Date(Date.now() + 1000 * 5)









/* if (localStorage.getItem('mensajes_recividos')) {
  let recivido = JSON.parse(localStorage.getItem('mensajes_recividos'));
  for (const iter of this.mensajesRecividos) {
    if (iter.total_mensajes !== recivido.total_mensajes) {
      console.log(recivido[0].total_mensajes);
      console.log(iter);
    }
  }
} else {
  localStorage.setItem('mensajes_recividos', JSON.stringify(this.mensajesRecividos));
} */