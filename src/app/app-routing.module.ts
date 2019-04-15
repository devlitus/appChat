import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { HomeGuard } from './guard/home.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [LoginGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [HomeGuard] },
  { path: 'room-chat/:id', loadChildren: './room-chat/room-chat.module#RoomChatPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
