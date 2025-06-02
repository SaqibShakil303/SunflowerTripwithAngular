import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { AnimationDirective } from '../../directives/animation.directive';

import { TestimonialsComponent } from "../../components/testimonials/testimonials.component";
import { DestinationsComponent } from "../../components/destinations/destinations.component";

import { ServicesComponent } from '../../components/services/services.component';
import { ChatWidgetComponent } from "../../components/chat-widget/chat-widget.component";
import { FooterComponent } from "../../common/footer/footer.component";

import { NewsletterComponent } from "../../components/newsletter/newsletter.component";

import { MapComponent } from "../../components/map/map.component";
import { WhyUsComponent } from "../../components/why-us/why-us.component";
import { Tour } from '../../models/tour.model';
import { debounceTime, Subject } from 'rxjs';
import { TourService } from '../../services/tours/tour.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PanoViewerComponent } from "../../components/pano-viewer/pano-viewer.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TourFilterComponent } from '../../common/tour-filter/tour-filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, AnimationDirective, TestimonialsComponent, DestinationsComponent, ServicesComponent, ChatWidgetComponent, FooterComponent, MapComponent, WhyUsComponent,TourFilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
    searchTerm: string = '';
  searchResults: Tour[] = [];
  searching = false;
iframeLoaded = false;
kuulaUrl!: SafeResourceUrl;

   private searchSubject = new Subject<string>();

     constructor(private tourService: TourService,private sanitizer: DomSanitizer) {
      this.kuulaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://kuula.co/share/5D6pm?logo=1&info=1&fs=1&vr=0&sd=1&autorotate=0.39&thumbs=1&margin=1&inst=0'
  );
    this.searchSubject.pipe(debounceTime(400)).subscribe((term) => {
      this.performSearch(term);
    });
  }

onIframeLoad() {
  this.iframeLoaded = true;
}

onIframeError() {
  this.iframeLoaded = false;
}
  onSearch() {
    this.searching = true;
    this.searchSubject.next(this.searchTerm);
  }

  performSearch(query: string) {
    if (!query || query.trim().length < 2) {
      this.searchResults = [];
      this.searching = false;
      return;
    }

    this.tourService.getFilteredTours(query).subscribe({
      next: (tours) => {
        this.searchResults = tours;
        this.searching = false;
      },
      error: () => {
        this.searchResults = [];
        this.searching = false;
      }
    });
  }
  ngAfterViewInit() {
    // Any additional initialization if needed
  }
}