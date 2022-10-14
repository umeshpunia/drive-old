import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authSer: AuthService, private router: Router) {
    this.authSer.isLogin.subscribe((res) => (this.isLogin = res));
  }
  isLogin: boolean = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.isLogin) {
      this.router.navigate(['/drive/folders']);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
