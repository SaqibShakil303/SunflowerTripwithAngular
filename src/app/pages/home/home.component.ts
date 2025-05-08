import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AnimationDirective } from '../../directives/animation.directive';
import { ProductSliderComponent } from '../../components/product-slider/product-slider.component';
import { AboutComponent } from '../../components/about/about.component';
import { TestimonialsComponent } from "../../components/testimonials/testimonials.component";
import { DestinationsComponent } from "../../components/destinations/destinations.component";
import { TopPicksComponent } from "../../components/top-picks/top-picks.component";
import { ServicesComponent } from '../../components/services/services.component';
import { ChatWidgetComponent } from "../../components/chat-widget/chat-widget.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ContactComponent } from "../../components/contact/contact.component";
import { NewsletterComponent } from "../../components/newsletter/newsletter.component";
import { ItineraryComponent } from "../../components/itinerary/itinerary.component";
import { MapComponent } from "../../components/map/map.component";
import { WhyUsComponent } from "../../components/why-us/why-us.component";

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