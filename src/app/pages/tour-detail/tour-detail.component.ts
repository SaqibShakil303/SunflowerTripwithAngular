import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from '../../models/tour.model';
import { TourService } from '../../services/tours/tour.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.scss'
})
export class TourDetailComponent {
 tour: Tour | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private tourService: TourService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.tourService.getTourBySlug(slug).subscribe({
        next: (res) => {
          this.tour = res;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.tour = null;
        }
      });
    }
  }
}
