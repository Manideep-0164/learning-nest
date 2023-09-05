import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorAuthGuard implements CanActivate {
  constructor(private globalService: GlobalService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Implement your authentication logic here
    if (this.globalService.isInstructorLogin) {
      return true; // Allow access for instructors
    } else {
      // Redirect to the login page if not authenticated
      this.globalService.redirectUrl = state.url;

      // Redirect to the login page
      return this.router.parseUrl('/instructor/signin');
      // return this.router.createUrlTree(['/instructor/signin']);
    }
  }
}
