import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public usuarios = [];
  public mensajesRecividos: any;
  public currentUser = JSON.parse(localStorage.getItem('user'));
  public mensajeLeido = false;

  constructor(
    private _usuarioService: UsuariosService,
    private _mensajeService: MensajesService,
    private router: Router,
    public platform: Platform,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.mostrarUsuarios();
    console.log('inicio componente');
  }
  // se activa al volver a la pagina
  ionViewWillEnter (){
    this.totalMensajes();
    console.log('ionViewWillEnter');
  }
  // Obtener todos los usuarios
  mostrarUsuarios() {
    this._usuarioService.obternerUsuarios()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
      }, error => console.error('Error observable', error)
      );
  }
  // Obtener los mensajes recividos de los otros usuarios
  totalMensajes() {
    this._mensajeService.mensajeRecivido()
      .subscribe(resp => {
        if (resp.length !== 0) {
          this.mensajesRecividos = [...resp]
          this.storage.set('message', this.mensajesRecividos)
          // console.log("todos los mensajes", this.mensajesRecividos);
        }
      },
        error => {
          console.error('Error observable', error);
        },
        () => {
          this.mensajes_recividos();
        })
  }
  mensajes_recividos() {
    if (this.platform.is('capacitor')) {
      let mensajeLocal: any;
      this.storage.get('message')
      .then(mensaje => {
        if (mensaje[0].receiver === this.currentUser.id){
          console.log("enviar notifiacion");
          this.mensajeLeido = true;
          if (mensaje[0].id !== this.mensajesRecividos[0].id){
            console.log('mensaje id y mensaje recivido diferentes');
            this.totalMensajes();
          }else {
            // this.mensajeLeido = false;
            console.log('mensaje id y mensaje recivido iguales');
            // this._mensajeService.mensajeRecivido().subscribe()
          }
          console.log("mensaje local", mensaje);
          
        }else {
          console.log("no iguales", mensaje);
        }
      }) 
      console.log('mensaje recivido', this.mensajesRecividos);
      
    }
    /* if (localStorage.getItem('message')){
      let mensaje = JSON.parse(localStorage.getItem('message'));

      console.log('existe messge', mensaje[0].id);
    }else {
      console.log('no exist message');
    } */
    // si es web
    /* console.log("envia el mensaje el usuario", this.mensajesRecividos[0].receiver);
    console.log("recive el mensaje el usuario", this.currentUser.id); */
    // Buscar si el mensaje recivido es para el usuario actual y no lo he leido
    /* if (this.currentUser.id === this.mensajesRecividos[0].receiver && !this.mensajeLeido) {
      console.log("Mostrar notificacion");
      this.totalMensajes();
      return this.mensajeLeido = true;
    } else {

    } */
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
    this.router.navigate(['/room-chat/', usuarioId, nombre]);
    return this.mensajeLeido = false;
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