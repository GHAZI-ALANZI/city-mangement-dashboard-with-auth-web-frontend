
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isNightMode: boolean = false;
  buildings: any[] = [];
  roofs: any[] = [];
  airCoolers: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Redirect Unauthorized Users
    if (!this.authService.isFullAdmin()) {
      console.warn("Unauthorized access. Redirecting to login...");
      this.authService.logout();
}

    
  }

  // Toggle Between Day & Night Mode
  toggleMode() {
    this.isNightMode = !this.isNightMode;
  }


}
