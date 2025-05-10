import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tour-package',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-package.component.html',
  styleUrl: './tour-package.component.scss'
})
export class TourPackageComponent {
  packages = [
    {
      title: 'Bali Bliss',
      shortDescription: '7 nights in Bali with guided tours.',
      slug: 'bali-bliss',
      imageUrl: 'assets/images/bali.webp'
    },
    // more packages...
  ];
  
  goToDetails(slug: string) {
    // this.router.navigate(['/destination', slug]);
  }
  
}
