import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AnimationDirective } from '../../directives/animation.directive';
import { ProductSliderComponent } from '../product-slider/product-slider.component';
import { AboutComponent } from '../about/about.component';
import { TestimonialsComponent } from "../testimonials/testimonials.component";
import { DestinationsComponent } from "../destinations/destinations.component";
import { TopPicksComponent } from "../top-picks/top-picks.component";
import { ServicesComponent } from '../services/services.component';
import { ChatWidgetComponent } from "../chat-widget/chat-widget.component";
import { FooterComponent } from "../footer/footer.component";
import { ContactComponent } from "../contact/contact.component";
import { NewsletterComponent } from "../newsletter/newsletter.component";
import { ItineraryComponent } from "../itinerary/itinerary.component";
import { MapComponent } from "../map/map.component";
import { WhyUsComponent } from "../why-us/why-us.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, AnimationDirective, ProductSliderComponent, AboutComponent, TestimonialsComponent, DestinationsComponent, TopPicksComponent, ServicesComponent, ChatWidgetComponent, FooterComponent, ContactComponent, NewsletterComponent, ItineraryComponent, MapComponent, WhyUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Any additional initialization if needed
  }
}