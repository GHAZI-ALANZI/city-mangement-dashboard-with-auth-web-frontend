import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from '@angular/common'; //  Import CommonModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'scale(0.9)' }),  
        animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))  // scale screen smoothly
      ])
    ])
  ]
  ,
  imports: [SidebarComponent, NavbarComponent,RouterOutlet,CommonModule]
})
export class AppComponent {

 

  
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
