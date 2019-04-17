import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public usuarios = [];
  public mensajesRecividos: any = [];
  constructor(
    private _usuarioService: UsuariosService,
    private _mensajeService: MensajesService,
    private router: Router) { }

  ngOnInit() {
    this.mostrarUsuarios();
  }
  // Obtener todos los usuarios
  mostrarUsuarios() {
    this._usuarioService.obternerUsuarios()
      .subscribe(usuarios => {
        this.totalMensajes();
        this.usuarios = usuarios;
      }, error => console.error('Error observable', error));
  }
  // Obtener los mensajes recividos de los otros usuarios
  totalMensajes() {
    this._mensajeService.totalMensajesEmisor()
      .subscribe(resp => {
        if (resp.length !== 0) {
          // console.log(resp);
          this.mensajesRecividos = [...resp];
        }
      },
        error => {
          console.error('Error observable', error);
        },
        () => {
          if (localStorage.getItem('mensajes_recividos')) {
            let recivido = JSON.parse(localStorage.getItem('mensajes_recividos'));
            for (const iter of this.mensajesRecividos) {
              if (iter.total_mensajes !== recivido.total_mensajes) {
                console.log(recivido[0].total_mensajes);
                console.log(iter);
              }
            }
          } else {
            localStorage.setItem('mensajes_recividos', JSON.stringify(this.mensajesRecividos));
          }
        })
  }

  // Ir al room chat pasandole el id del usuario que quieres enviarle un mensaje
  roomChat(usuarioId: any, nombre: any) {
    this.router.navigate(['/room-chat/', usuarioId, nombre]);
  }

}
