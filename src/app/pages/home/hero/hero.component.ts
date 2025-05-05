import { Component, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// import { BrowserAnimationsModule } from '@angular/animations';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  // imports: [BrowserAnimationsModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('textAnimation', [
      state('inactive', style({
        transform: 'scale3d(1, 1, 1) rotateY(500deg)',
        opacity: 0
      })),
      state('active', style({
        transform: 'scale3d(1, 1, 1) rotateY(0deg)',
        opacity: 1
      })),
      transition('inactive => active', animate('800ms ease'))
    ]),
    trigger('h1Animation', [
      state('inactive', style({
        transform: 'translate(0px, 115%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translate(0px, 0px)',
        opacity: 1
      })),
      transition('inactive => active', animate('800ms ease'))
    ]),
    trigger('h2Animation', [
      state('inactive', style({
        transform: 'translate(0px, 115%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translate(0px, 0px)',
        opacity: 1
      })),
      transition('inactive => active', animate('800ms 400ms ease'))
    ])
  ]
})
export class HeroComponent implements AfterViewInit {
  textState: 'inactive' | 'active' = 'inactive';
  h1State: 'inactive' | 'active' = 'inactive';
  h2State: 'inactive' | 'active' = 'inactive';

  @ViewChild('textElement', { static: false }) textElement!: ElementRef;
  @ViewChild('h1Element', { static: false }) h1Element!: ElementRef;
  @ViewChild('h2Element', { static: false }) h2Element!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log('Platform ID:', this.platformId); // Debug log
    console.log('Is browser:', isPlatformBrowser(this.platformId)); // Debug log
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Initializing IntersectionObserver in browser'); // Debug log
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log('Element in view:', entry.target.className); // Debug log
            if (entry.isIntersecting) {
              if (entry.target === this.textElement.nativeElement) {
                this.textState = 'active';
              } else if (entry.target === this.h1Element.nativeElement) {
                this.h1State = 'active';
              } else if (entry.target === this.h2Element.nativeElement) {
                this.h2State = 'active';
              }
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (this.textElement) observer.observe(this.textElement.nativeElement);
      if (this.h1Element) observer.observe(this.h1Element.nativeElement);
      if (this.h2Element) observer.observe(this.h2Element.nativeElement);
    } else {
      console.log('Skipping IntersectionObserver on server'); // Debug log
    }
  }
}