import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements  CanActivate{

  constructor(private _loginService: LoginService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._loginService.isLogged()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  
}
