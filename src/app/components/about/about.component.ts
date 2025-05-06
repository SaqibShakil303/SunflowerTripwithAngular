import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import AOS from 'aos';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

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
