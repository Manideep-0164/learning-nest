// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private globalService: GlobalService, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.globalService.isStudentLogin) {
      return true;
    } else {
      // Store the intended URL for redirection after login
      this.globalService.redirectUrl = state.url;

      // Redirect to the login page
      return this.router.parseUrl('/sign-in');
    }
  }
}
