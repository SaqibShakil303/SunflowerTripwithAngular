import { Component, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Aos from 'aos';
import { RouterModule } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('staggerAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(100, [
            animate('0.8s ease', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class DestinationsComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;

  destinations = [
    {
          id: 2,
      name: "Bali, Indonesia",
      description: "Experience the perfect blend of spiritual tranquility and tropical paradise on the Island of the Gods.",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slug: "bali-indonesia"
    },
    {
          id: 3,
      name: "Kyoto, Japan",
      description: "Discover ancient temples, traditional tea houses, and the mesmerizing beauty of cherry blossoms in bloom.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3lvdG98ZW58MHx8MHx8fDA%3D",
      slug: "kyoto-japan"
    },
    {
          id: 4,
      name: "Santorini, Greece",
      description: "Immerse yourself in the breathtaking views of whitewashed buildings against the azure Aegean Sea.",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1438&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slug: "santorini-greece"
    },
    {
          id: 5,
      name: "Machu Picchu, Peru",
      description: "Trek through the mysterious ancient ruins nestled high in the Andes mountains.",
      image: "https://images.unsplash.com/photo-1465513527097-544020a68b06?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slug: "machu-picchu-peru"
    },
    {
          id: 7,
      name: "Amalfi Coast, Italy",
      description: "Wind along dramatic cliffside roads, explore colorful coastal towns, and savor authentic Italian cuisine.",
      image: "https://images.unsplash.com/photo-1745435797226-6a2360de4339?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      slug: "amalfi-coast-italy"
    },
    {

      name: "Queenstown, New Zealand",
      description: "Find your adventure in this stunning lakeside town surrounded by majestic mountains and lush landscapes.",
      image: "https://images.unsplash.com/photo-1718398892734-6948c85416c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UXVlZW5zdG93biUyQyUyME5ldyUyMFplYWxhbmR8ZW58MHx8MHx8fDA%3D",
      slug: "queenstown-new-zealand"
    }
  ];

  private swiper!: Swiper;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Aos.init({
        duration: 800,
        once: true
      });
      // Delay Swiper initialization to ensure DOM is ready
      setTimeout(() => this.initSwiper(), 0);
    }
  }

  private initSwiper(): void {
    if (this.swiperContainer && this.swiperContainer.nativeElement) {
      this.swiper = new Swiper(this.swiperContainer.nativeElement, {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }
      });
    } else {
      console.error('Swiper container not found or DOM not ready');
    }
  }
}