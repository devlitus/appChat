import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public usuarios = [];
  constructor(private _usuarioService: UsuariosService, private router: Router) { }

  ngOnInit() {
    this.mostrarUsuarios();
  }
  // Obtener todos los usuarios
  mostrarUsuarios() {
    this._usuarioService.obternerUsuarios()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
      },
        error => console.error('Error observable', error));
  }
  // Ir al room chat pasandole el id del usuario que quieres enviarle un mensaje
  roomChat(usuarioId: any) {
    this.router.navigate(['/room-chat/', usuarioId]);
  } 

}
