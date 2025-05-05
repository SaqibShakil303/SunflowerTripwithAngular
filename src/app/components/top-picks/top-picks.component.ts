import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-top-picks',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-picks.component.html',
  styleUrls: ['./top-picks.component.scss']
})
export class TopPicksComponent implements AfterViewInit {
  topPicks = [
    // {
    //   title: 'Darjeeling',
    //   description: 'Escape to the Queen of Hills, known for its tea gardens and stunning Himalayan views.',
    //   image: 'https://images.pexels.com/photos/3467160/pexels-photo-3467160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    // },
    {
      title: 'Bangkok, Thailand',
      description: 'A vibrant city with temples, markets, and nightlife, accessible via direct flights from Kolkata.',
      image: 'https://images.pexels.com/photos/3467161/pexels-photo-3467161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Andaman Islands',
      description: 'Relax on pristine beaches and dive into crystal-clear waters, just a flight from Kolkata.',
      image: 'https://images.pexels.com/photos/3467162/pexels-photo-3467162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      title: 'Bhutan',
      description: 'Discover the Land of the Thunder Dragon with its monasteries and scenic valleys, easily reachable from Kolkata.',
      image: 'https://images.pexels.com/photos/3467163/pexels-photo-3467163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
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