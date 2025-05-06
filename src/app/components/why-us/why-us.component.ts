import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.scss']
})
export class WhyUsComponent implements AfterViewInit {
  whyUsItems = [
    {
      icon: 'fas fa-globe',
      title: 'Global Expertise, Local Touch',
      description: 'Based in Kolkata, we blend international standards with a deep understanding of Indian travelers’ preferences.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Personalized Journeys',
      description: 'Every trip is tailored to your dreams, ensuring a unique and memorable experience.'
    },
    {
      icon: 'fas fa-headset',
      title: '24/7 Support',
      description: 'Our Kolkata team is always available to assist, from planning to your return home.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Trusted & Secure',
      description: 'Travel with confidence knowing every detail is handled by our experienced team.'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        once: true
      });
    }
  }
}