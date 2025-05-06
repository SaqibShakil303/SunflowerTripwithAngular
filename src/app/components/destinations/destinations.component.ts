import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements AfterViewInit {
  destinations = [
    {
      image: '/assets/images/luxury/effile-tower.jpg',
      name: 'Paris',
      description: 'Experience the romance of Paris with our curated tours.',
      link: '#'
    },
    {
      image: '/assets/images/luxury/dubai-stunning.jpg',
      name: 'Dubai',
      description: 'Discover the luxury and adventure of Dubai’s skyline.',
      link: '#'
    },
    {
      image: '/assets/images/Thailand.jpg',
      name: 'Bali',
      description: 'Relax in Bali’s serene beaches and vibrant culture.',
      link: '#'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        once: true
      });
    }
  }
}