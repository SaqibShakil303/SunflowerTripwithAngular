import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AnimationDirective } from '../../directives/animation.directive';

import { TestimonialsComponent } from "../../components/testimonials/testimonials.component";
import { DestinationsComponent } from "../../components/destinations/destinations.component";

import { ServicesComponent } from '../../components/services/services.component';
import { ChatWidgetComponent } from "../../components/chat-widget/chat-widget.component";
import { FooterComponent } from "../../components/footer/footer.component";

import { NewsletterComponent } from "../../components/newsletter/newsletter.component";

import { MapComponent } from "../../components/map/map.component";
import { WhyUsComponent } from "../../components/why-us/why-us.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, AnimationDirective, TestimonialsComponent, DestinationsComponent, ServicesComponent, ChatWidgetComponent, FooterComponent, NewsletterComponent, MapComponent, WhyUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Any additional initialization if needed
  }
}