import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-city-sections',
  templateUrl: './city-sections.component.html',
  styleUrls: ['./city-sections.component.scss'],
  imports :[CommonModule]
})
export class CitySectionsComponent {
  sections = [
    { name: "Finance", icon: "bi-cash-coin", link: "https://finance.com" },
    { name: "Health", icon: "bi-heart-pulse", link: "https://health.com" },
    { name: "Education", icon: "bi-book", link: "https://education.com" },
    { name: "Technology", icon: "bi-cpu", link: "https://tech.com" },
    { name: "Security", icon: "bi-shield-lock", link: "https://security.com" }
  ];
}
