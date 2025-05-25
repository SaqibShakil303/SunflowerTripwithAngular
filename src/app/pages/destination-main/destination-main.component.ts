import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import  { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { SafeUrlPipe } from '../../common/pipes/safe-url.pipe';
import { DestinationService } from '../../services/destination/destination.service';
import { Destination } from '../../models/destination.model';
import Swiper from 'swiper';
import { FooterComponent } from "../../common/footer/footer.component";
import { NavbarComponent } from "../../common/navbar/navbar.component";

@Component({
  selector: 'app-destination-main',
  standalone: true,
  imports: [CommonModule, RouterModule, SafeUrlPipe, FooterComponent, NavbarComponent],
  templateUrl: './destination-main.component.html',
  styleUrls: ['./destination-main.component.scss']
})
export class DestinationMainComponent implements OnInit{
  destination: Destination | null = null;

  // One Swiper instance per section
  @ViewChild('packagesSwiper') packagesSwiper!: ElementRef;
  @ViewChild('attractionsSwiper') attractionsSwiper!: ElementRef;
  @ViewChild('cultureSwiper') cultureSwiper!: ElementRef;
  @ViewChild('cuisineSwiper') cuisineSwiper!: ElementRef;
  @ViewChild('activitiesSwiper') activitiesSwiper!: ElementRef;

  // private swipers: Swiper[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private destSvc: DestinationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  
  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id) || id <= 0) {
      // Navigate and bail out, without returning the Promise
      this.router.navigateByUrl('/');
      return;
    }

    this.destSvc.getDestinationDetails(id).subscribe({
      next: dest => {
        this.destination = dest;
        // Once data is bound, initialize each Swiper
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => {
            this.initSwiper(this.packagesSwiper);
            this.initSwiper(this.attractionsSwiper);
            this.initSwiper(this.cultureSwiper);
            this.initSwiper(this.cuisineSwiper);
            this.initSwiper(this.activitiesSwiper);
          }, 0);
        }
      },
      error: () => {
        this.router.navigateByUrl('/');
      }
    });
  }

    private initSwiper(elRef: ElementRef): void {
    if (!elRef?.nativeElement) return;
    new Swiper(elRef.nativeElement, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        640:  { slidesPerView: 1, spaceBetween: 20 },
        768:  { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 40 }
      }
    });
  }

}
