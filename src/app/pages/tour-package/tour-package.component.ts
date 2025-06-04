import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TourService } from '../../services/tours/tour.service';
import { FooterComponent } from '../../common/footer/footer.component';
import { FAQComponent } from "../../components/faq/faq.component";
import { TestimonialsComponent } from "../../components/testimonials/testimonials.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { ChatWidgetComponent } from "../../components/chat-widget/chat-widget.component";
import { DestinationService } from '../../services/destination/destination.service';
import { TourFilterComponent } from '../../common/tour-filter/tour-filter.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-tour-package',
  standalone: true,
  imports: [
    TourFilterComponent,
    CommonModule, RouterModule, FooterComponent, FAQComponent, TestimonialsComponent,
    FormsModule, NavbarComponent, ChatWidgetComponent, ReactiveFormsModule,ClickOutsideDirective
  ],
  templateUrl: './tour-package.component.html',
  styleUrl: './tour-package.component.scss'
})
export class TourPackageComponent {
  tours: Tour[] = [];
  destinations: any[] = [];
  categories: string[] = [];
  loading = false;
  error: string | null = null;
  filterForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toursSvc: TourService,
    private fb: FormBuilder,
    private destSvc: DestinationService
  ) {}

  ngOnInit(): void {
  this.filterForm = this.fb.group({
    destination_id: [''],
    category: [''],
    min_price: [''],
    max_price: [''],
    min_duration: [''],
    max_duration: [''],
    available_from: [''],
    available_to: [''],
    accommodation_rating: [''],
    flight_included: [''],
    adults: [null],
    children: [null],
    rooms: [null],
    // location: [''],
    fromCity: ['']
  });

    this.route.queryParams.subscribe(params => {
      this.loading = true;
      this.error = null;
      const destId = params['destination'];
      const locId = params['location'];
      const category = params['category'];
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
          // console.log(tours);

          this.loading = false;
        },
        error: err => {
          this.error = 'Failed to load tours.';
          console.error(err);
          this.loading = false;
        }
      });
    });

    // Fetch destination and category data for filter dropdowns
    this.destSvc.getNamesAndLocations().subscribe({
      next: (data) => {
        // console.log("destinations: ",data);
        this.destinations = data;
      },
      error: err => console.error('Failed loading destinations', err)
    });

    this.toursSvc.getCategories().subscribe({
      next: (data: string[]) => {
              // console.log("categories: ",data);
        this.categories = data;
      },
      error: err => console.error('Failed loading categories', err)
    });
  }

  applyFilters() {
    const filters = this.filterForm.value;
    this.loading = true;
    this.toursSvc.getFilteredTours(filters).subscribe({
      next: tours => {
        this.tours = tours;
        this.loading = false;
      },
      error: err => {
        this.error = 'Failed to load filtered tours';
        this.loading = false;
      }
    });
  }

  goToTourDetail(slug: string): void {
    this.router.navigate(['/tour', slug]);
  }
  handleSearch(filters: any) {
  console.log('Filters received from child:', filters);

  // Optionally update your internal state
  this.loading = true;
    // this.filterForm = filters;
  this.toursSvc.getFilteredTours(filters).subscribe({
    next: (data) => {
      this.tours = data;
    
      this.loading = false;
    },
    error: (err) => {
      this.error = 'Failed to load tours';
      this.loading = false;
    }
  });
}

}
