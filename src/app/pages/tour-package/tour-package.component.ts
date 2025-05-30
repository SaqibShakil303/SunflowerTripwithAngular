import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TourService } from '../../services/tours/tour.service';
import { FooterComponent } from '../../common/footer/footer.component';
import e from 'express';
import { FAQComponent } from "../../components/faq/faq.component";
import { TestimonialsComponent } from "../../components/testimonials/testimonials.component";
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { ChatWidgetComponent } from "../../components/chat-widget/chat-widget.component";

interface DurationFilter { label: string; min: number; max: number; }

@Component({
  selector: 'app-tour-package',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, FAQComponent, TestimonialsComponent, FormsModule, NavbarComponent, ChatWidgetComponent],
  templateUrl: './tour-package.component.html',
  styleUrl: './tour-package.component.scss'
})
export class TourPackageComponent {
   tours: Tour[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      } else if (category) {
        obs$ = this.toursSvc.getByCategory(category);
      } else {
        this.error = 'No filters applied to fetch tours.';
        this.loading = false;
        return;
      }

      obs$.subscribe({
        next: tours => {
          this.tours = tours;
          console.log(tours);
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

  goToTourDetail(slug: string): void {
    this.router.navigate(['/tour', slug]);
  }
  // private applyFilters() {
  //   this.filteredTours = this.tours.filter(t => {
  //     const matchCity = !this.selectedCity || t.location === this.selectedCity;
  //     const matchCat  = !this.selectedCategory || t.category === this.selectedCategory;
  //     const matchDur  = !this.selectedDuration || (t.duration_days >= this.selectedDuration.min && t.duration_days <= this.selectedDuration.max);
  //     const matchBud  = Number(t.price) <= this.selectedBudget;
  //     return matchCity && matchCat && matchDur && matchBud;
  //   });
  // }
}
