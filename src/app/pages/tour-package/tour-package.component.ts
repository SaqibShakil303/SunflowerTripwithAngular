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

@Component({
  selector: 'app-tour-package',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FooterComponent, FAQComponent, TestimonialsComponent,
    FormsModule, NavbarComponent, ChatWidgetComponent, ReactiveFormsModule
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
  available_to: ['']
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
        // console.log("destination",data);
        this.destinations = data;
      },
      error: err => console.error('Failed loading destinations', err)
    });

    this.toursSvc.getCategories().subscribe({
      next: (data: string[]) => {
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
}
// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { forkJoin } from 'rxjs';
// import { TourService } from '../../services/tours/tour.service';
// import { DestinationService } from '../../services/destination/destination.service';
// import { Tour } from '../../models/tour.model';
// import { FooterComponent } from '../../common/footer/footer.component';
// import { FAQComponent } from '../../components/faq/faq.component';
// import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
// import { ChatWidgetComponent } from '../../components/chat-widget/chat-widget.component';
// import { NavbarComponent } from "../../common/navbar/navbar.component";

// @Component({
// selector: 'app-tour-package',
// standalone: true,
// imports: [
//     CommonModule,
//     RouterModule,
//     FooterComponent,
//     FAQComponent,
//     TestimonialsComponent,
//     ReactiveFormsModule,
//     FormsModule,
//     ChatWidgetComponent,
//     NavbarComponent
// ],
// templateUrl: './tour-package.component.html',
// styleUrls: ['./tour-package.component.scss']
// })
// export class TourPackageComponent implements OnInit {
// tours: Tour[] = [];
// destinations: any[] = [];
// categories: string[] = [];
// loading = false;
// error: string | null = null;
// filterForm!: FormGroup;

// minBudget = 10000;
// maxBudget = 100000;
// selectedMinBudget = 20000;
// selectedMaxBudget = 80000;

// minNights = 1;
// maxNights = 11;
// selectedNights = 4;

// roomCount = 2;
// adults = 2;
// children = 1;
// selectedStars: number[] = [];

// constructor(
// private fb: FormBuilder,
// private toursSvc: TourService,
// private destSvc: DestinationService,
// private router: Router
// ) {}

// ngOnInit(): void {
// this.filterForm = this.fb.group({
// from_city: [''],
// destination_id: [''],
// available_from: [''],
// rooms: [''],
// adults: [''],
// children: [''],
// min_price: [''],
// max_price: [''],
// category: ['']
// });


// forkJoin({
//   destinations: this.destSvc.getNamesAndLocations(),
//   categories: this.toursSvc.getCategories()
// }).subscribe({
//   next: ({ destinations, categories }) => {
//     this.destinations = destinations;
//     this.categories = categories;
//   },
//   error: err => {
//     console.error('Failed to load filter data', err);
//   }
// });

// this.toursSvc.getAllTours().subscribe({
//   next: (tours) => {
//     this.tours = tours;
//   },
//   error: (err) => {
//     this.error = 'Failed to load tours';
//   }
// });


// }

// applyFilters() {
// const filters = this.filterForm.value;
// filters.min_price = this.selectedMinBudget;
// filters.max_price = this.selectedMaxBudget;
// filters.min_duration = this.selectedNights;
// filters.max_duration = this.selectedNights;
// filters.stars = this.selectedStars;


// this.loading = true;
// this.toursSvc.getFilteredTours(filters).subscribe({
//   next: tours => {
//     this.tours = tours;
//     this.loading = false;
//   },
//   error: err => {
//     this.error = 'Failed to load filtered tours';
//     this.loading = false;
//   }
// });


// }

// toggleStarCategory(star: number): void {
// const index = this.selectedStars.indexOf(star);
// if (index === -1) {
// this.selectedStars.push(star);
// } else {
// this.selectedStars.splice(index, 1);
// }
// }

// goToTourDetail(slug: string): void {
// this.router.navigate(['/tour', slug]);
// }
// }
