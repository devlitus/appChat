import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
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
    private router: Router,
    public platform: Platform,
    public storage: Storage
  ) { }

  ngOnInit() {
    this.mostrarUsuarios();
    // console.log('inicio componente');
  }
  // se activa al volver a la pagina
  ionViewWillEnter (){
    // console.log('ionViewWillEnter');
  }
  // Obtener todos los usuarios
  mostrarUsuarios() {
    this._usuarioService.obternerUsuarios()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
      }, error => console.error('Error observable', error)
      );
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