import { Directive, ElementRef, OnInit, Renderer2, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAnimation]',
  standalone: true
})
export class AnimationDirective implements OnInit {
  private platformId = inject(PLATFORM_ID);

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Only run in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimation();
    } else {
      // Optional: Add default class in SSR for initial styling if needed
      // this.renderer.addClass(this.el.nativeElement, '_active');
    }
  }

  private initAnimation(): void {
    // Check if IntersectionObserver is available
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.renderer.addClass(entry.target, '_active');
              // Unobserve after adding class to trigger animation only once
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the element is visible
      );

      observer.observe(this.el.nativeElement);
    } else {
      // Fallback for environments without IntersectionObserver
      // Simply add the animation class immediately
      this.renderer.addClass(this.el.nativeElement, '_active');
    }
  }
}