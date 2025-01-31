import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isFullAdmin()) {
      console.warn("Access Denied: Not FullAdmin. Redirecting to Next.js login...");
      this.authService.logout(); //  Log out and redirect
      return false;
    }
    return true;
  }
}
