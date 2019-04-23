import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guard/login.guard';
import { HomeGuard } from './guard/home.guard';
import { ChatRoomComponent } from './components/chat/chat-room.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [LoginGuard] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule', canActivate: [HomeGuard] },
  { path: 'chat/:id/:username', component: ChatRoomComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
