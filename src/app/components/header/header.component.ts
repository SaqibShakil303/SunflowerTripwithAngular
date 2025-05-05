import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimationDirective } from '../../directives/animation.directive';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AnimationDirective,NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
 // Navigation dropdown items
 holidayPackages = [
  { name: 'Beach Getaways', route: '/beach-getaways' },
  { name: 'City Breaks', route: '/city-breaks' },
  { name: 'Adventure Tours', route: '/adventure-tours' }
];

groupPackages = [
  { name: 'Family Trips', route: '/family-trips' },
  { name: 'Corporate Retreats', route: '/corporate-retreats' },
  { name: 'Friends Getaways', route: '/friends-getaways' }
];

destinations = [
  { name: 'Europe', route: '/europe' },
  { name: 'Asia', route: '/asia' },
  { name: 'Africa', route: '/africa' }
];

dealsOffers = [
  { name: 'Last Minute Deals', route: '/last-minute-deals' },
  { name: 'Early Bird Offers', route: '/early-bird-offers' },
  { name: 'Seasonal Discounts', route: '/seasonal-discounts' }
];

customizeHoliday() {
  console.log('Customize holiday button clicked');
  // Add your custom holiday logic here
}
}
