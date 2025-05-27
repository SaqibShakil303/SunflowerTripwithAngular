import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TourService } from '../../services/tours/tour.service';
import { FooterComponent } from '../../common/footer/footer.component';
import e from 'express';

@Component({
  selector: 'app-tour-package',
  standalone: true,
  imports: [CommonModule,RouterModule,FooterComponent],
  templateUrl: './tour-package.component.html',
  styleUrl: './tour-package.component.scss'
})
export class TourPackageComponent {
   tours: Tour[] = [];
  loading = true;
  error: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private toursSvc: TourService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loading = true;
      this.error = null;
      const destId = params['destination'];
      const locId  = params['location'];
      const category  = params['category'];
      let obs$;
      if (locId) {
        obs$ = this.toursSvc.getByLocation(+locId);
      } else if (destId) {
        obs$ = this.toursSvc.getByDestination(+destId);
      }else if (category) {
        obs$ = this.toursSvc.getByCategory(category);
      }
      else {
        this.error = 'No destination or location specified.';
        this.loading = false;
        return;
      }

      obs$.subscribe({
        next: tours => {
          this.tours = tours;
          this.loading = false;
        },
        error: err => {
          this.error = 'Failed to load tours.';
          console.error(err);
          this.loading = false;
        }
      });
    });
  }

  
}
