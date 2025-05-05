import { Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
import AOS from 'aos';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  testimonials = [
    {
      quote: 'Sunflower Trip made our European adventure seamless and unforgettable. From curated tours to perfect accommodations, every detail was spot-on. Their Kolkata team truly understands what Indian travelers want!',
      name: 'Priya Sharma',
      trip: 'Paris & Switzerland',
      image: 'https://images.pexels.com/photos/3467164/pexels-photo-3467164.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      quote: 'As first-time international travelers from Kolkata, we were nervous, but Sunflower Trip made our Singapore trip effortless. Their 24/7 support and detailed planning gave us confidence to explore freely.',
      name: 'Arjun Banerjee',
      trip: 'Singapore & Malaysia',
      image: 'https://images.pexels.com/photos/3467165/pexels-photo-3467165.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      quote: 'Our family trip to Sikkim was a dream come true, thanks to Sunflower Trip. The local guides were fantastic, and the itinerary was perfect for our kids. We’re already planning Rajasthan next!',
      name: 'The Mukherjee Family',
      trip: 'Sikkim & Darjeeling',
      image: 'https://images.pexels.com/photos/3467166/pexels-photo-3467166.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    },
    {
      quote: 'Sunflower Trip turned our dream Bali vacation into reality. Their attention to detail and personalized touches made every moment special. Highly recommend their Kolkata team!',
      name: 'Sneha Roy',
      trip: 'Bali',
      image: 'https://images.pexels.com/photos/3467167/pexels-photo-3467167.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        once: true
      });

      new Swiper(this.swiperContainer.nativeElement, {
        modules: [Autoplay, Pagination],
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true
      });
    }
  }
}