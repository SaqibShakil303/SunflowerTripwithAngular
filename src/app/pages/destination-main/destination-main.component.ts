import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-destination-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './destination-main.component.html',
  styleUrl: './destination-main.component.scss'
})
export class DestinationMainComponent {
  constructor(private router: RouterModule) { }
  destination = {
    name: 'Bali Bliss',
    fullDescription: 'Experience the beauty of Bali...',
    imageUrl: 'assets/images/bali.webp',
    inclusions: ['Hotel Stay', 'Daily Breakfast', 'Airport Pickup']
  };
  
  startBooking() {
    // this.router.navigate(['/booking'], { state: { destination: this.destination.name } });
  }
  
}
