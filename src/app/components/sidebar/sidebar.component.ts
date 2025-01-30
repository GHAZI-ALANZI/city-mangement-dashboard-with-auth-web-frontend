
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router ,RouterLink} from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [RouterLink,BsDatepickerModule,FormsModule,CommonModule]

})
export class SidebarComponent implements OnInit {
  isFullAdmin = false;
  days: number[] = [];
  currentDay: number = new Date().getDate(); // Get current day

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    //  Check if the user is FullAdmin
    this.isFullAdmin = this.authService.isFullAdmin();

    this.generateDays();
    this.updateClock();
    setInterval(() => this.updateClock(), 1000); // Update clock every second
  }

  //  Generate Days for Calendar (Dynamically Adjust for Leap Years)
  generateDays() {
    const month = new Date().getMonth() + 1; // Current month
    const year = new Date().getFullYear();
    const totalDays = new Date(year, month, 0).getDate(); // Get total days in the month
    this.days = Array.from({ length: totalDays }, (_, i) => i + 1);
  }

  //  Toggle Sidebar (For Mobile)
  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar?.classList.toggle('active');
  }

  //  Close Sidebar on Small Screens
  closeSidebar() {
    if (window.innerWidth <= 768) {
      document.querySelector('.sidebar')?.classList.remove('active');
    }
  }

  //  Change Language & Refresh Page
  changeLanguage(lang: string) {
    localStorage.setItem('language', lang);
    alert(`Language changed to ${lang.toUpperCase()}!`);
    location.reload();
  }

  //  Logout & Redirect to Login
  logout() {
    this.authService.logout();
  }

  //  Update Clock Hands
  updateClock(): void {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourAngle = (360 / 12) * hours + (360 / 12) * (minutes / 60);
    const minuteAngle = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
    const secondAngle = (360 / 60) * seconds;

    (document.getElementById('hour-hand') as HTMLElement)?.setAttribute('transform', `rotate(${hourAngle} 50 50)`);
    (document.getElementById('minute-hand') as HTMLElement)?.setAttribute('transform', `rotate(${minuteAngle} 50 50)`);
    (document.getElementById('second-hand') as HTMLElement)?.setAttribute('transform', `rotate(${secondAngle} 50 50)`);
  }
}
