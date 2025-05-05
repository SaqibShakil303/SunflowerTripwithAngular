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
      image: 'https://images.pexels.com/photos/261481/pexels-photo-261481.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'Paris',
      description: 'Experience the romance of Paris with our curated tours.',
      link: '#'
    },
    {
      image: 'https://images.pexels.com/photos/162031/dubai-tower-162031.jpeg?auto=compress&cs=tinysrgb&w=400',
      name: 'Dubai',
      description: 'Discover the luxury and adventure of Dubai’s skyline.',
      link: '#'
    },
    {
      image: 'https://images.pexels.com/photos/161815/bali-statue-161815.jpeg?auto=compress&cs=tinysrgb&w=400',
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