import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Tour } from '../../models/tour.model';
import { TourService } from '../../services/tours/tour.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../common/footer/footer.component";
import { HeaderComponent } from "../../common/header/header.component";
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { ChatWidgetComponent } from "../../components/chat-widget/chat-widget.component";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FooterComponent,  NavbarComponent, ChatWidgetComponent],
  templateUrl: './tour-detail.component.html',
  styleUrl: './tour-detail.component.scss'
})
export class TourDetailComponent implements OnInit {
  isMobileView = false;
 showBookingCard = false;
  tour: Tour | null = null;
  loading = true;
  activeTab = 'overview';
  inclusionTab = 'inclusions';
  selectedDate = '';
  selectedGuests = 1;

  constructor(private route: ActivatedRoute, private tourService: TourService,@Inject(PLATFORM_ID) private platformId: Object,
private meta: Meta, private title: Title) {}

  // ngOnInit(): void {
  //   const slug = this.route.snapshot.paramMap.get('slug');
  //   if (slug) {
  //     this.tourService.getTourBySlug(slug).subscribe({
  //       next: (res) => {
  //         this.tour = res;
  //         this.loading = false;
  //       },
  //       error: () => {
  //         this.loading = false;
  //         this.tour = null;
  //       }
  //     });
  //   }
  // }

ngOnInit(): void {
   if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 768;
    }
  const slug = this.route.snapshot.paramMap.get('slug');

  // If there’s no slug in the URL, stop the spinner immediately
  if (!slug) {
    this.loading = false;
    return;
  }

  // Otherwise fetch the tour
  this.tourService.getTourBySlug(slug).subscribe({
    next: (tour) => {
      this.tour = tour;
      // default date to available_from
      this.selectedDate = this.formatDate(tour.available_from);
      this.loading = false;

        // Set dynamic SEO meta tags
  this.title.setTitle(tour.meta_title || tour.title);
  this.meta.updateTag({ name: 'description', content: tour.meta_description || tour.description });

  // Optional Open Graph (for social sharing)
  this.meta.updateTag({ name: 'og:title', content: tour.meta_title || tour.title });
  this.meta.updateTag({ name: 'og:description', content: tour.meta_description || tour.description });
  this.meta.updateTag({ name: 'og:image', content: tour.image_url });
  this.meta.updateTag({ name: 'og:url', content: `https://sunflowertrip.in/tours/${tour.slug}` });
    },
    error: () => {
      this.tour = null;
      this.loading = false;
    }
  });

  
}
  toggleBookingCard() {
    this.showBookingCard = !this.showBookingCard;
  }
private transformTourData(data: any): Tour {
  // parse JSON fields into arrays
  data.inclusions      = this.safeParse(data.inclusions);
  data.exclusions      = this.safeParse(data.exclusions);
  data.complementaries = this.safeParse(data.complementaries);
  data.highlights      = this.safeParse(data.highlights);
  data.languages_supported = this.safeParse(data.languages_supported);
  data.meals_included  = this.safeParse(data.meals_included);
  data.activity_types  = this.safeParse(data.activity_types);
  // …and any other JSON fields…

  return data as Tour;
}


private safeParse(field: any): any[] {
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  }
  return Array.isArray(field) ? field : [];
}
/** Helper to format an ISO date string for <input type="date"> */

private formatDate(dateStr: string): string {
  return new Date(dateStr).toISOString().split('T')[0];
}
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  formatPrice(price: string | number): string {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toLocaleString('en-IN');
  }

  getAvailabilityText(): string {
    if (!this.tour) return '';
    const fromDate = new Date(this.tour.available_from);
    const toDate = new Date(this.tour.available_to);
    return `Available ${fromDate.toLocaleDateString()} - ${toDate.toLocaleDateString()}`;
  }

  getMinDate(): string {
    if (!this.tour) return '';
    return new Date(this.tour.available_from).toISOString().split('T')[0];
  }

  getMaxDate(): string {
    if (!this.tour) return ''; 
    return new Date(this.tour.available_to).toISOString().split('T')[0];
  }

  getItineraryDays(): any[] {
    if (!this.tour?.itinerary) return [];
    
    // Parse the current string format or return structured data if available
    if (typeof this.tour.itinerary === 'string') {
      return this.tour.itinerary.split('\n').map((day, index) => ({
        title: `Day ${index + 1}`,
        description: day.replace(/^Day \d+:\s*/, '')
      }));
    }
    
    return this.tour.itinerary;
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  openEnquiryForm(): void {
    // Implementation for enquiry form
    console.log('Opening enquiry form');
  }

  openBookingForm(): void {
    // Implementation for booking form
    console.log('Opening booking form');
  }

  proceedBooking(): void {
    // Implementation for proceed booking
    console.log('Proceeding with booking', {
      date: this.selectedDate,
      guests: this.selectedGuests
    });
  }

  saveToWishlist(): void {
    // Implementation for wishlist
    console.log('Saving to wishlist');
  }

  viewReviews(): void {
    this.setActiveTab('reviews');
  }

  openPhotoModal(photo: any): void {
    // Implementation for photo modal
    console.log('Opening photo modal', photo);
  }
}