import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

  constructor(private cookieService: CookieService) {} 

  // Get Token from Cookies
  getToken(): string | null {
    const token = this.cookieService.get("token");

    if (!token) {
      console.warn("No token found in cookies."); 
      return null;
    }

    console.log("Retrieved Token from Cookie:", token);
    return token;
  }

  // Decode JWT & Get Role
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded[this.roleClaim] || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  //  Check if User has `FullAdmin` Role
  isFullAdmin(): boolean {
    return this.getUserRole() === "FullAdmin";
  }

  // Logout Function (Redirects to Next.js Login)
  logout() {
    console.log("Logging out unauthorized user...");
    this.cookieService.delete("token");
    window.location.href = "http://localhost:3000"; //  Redirect to Next.js Login
  }
}
