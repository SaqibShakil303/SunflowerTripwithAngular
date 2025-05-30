import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isScrolled = false;
  isMobileMenuOpen = false;
 isMobileNavVisible = true; // Controls mobile nav visibility
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
hideMobileNav() {
    this.isMobileNavVisible = false;
  }
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
// Show mobile nav
  showMobileNav() {
    this.isMobileNavVisible = true;
  }
  // Close mobile nav when a route is clicked
  navigateTo(route: string) {
    this.closeMobileMenu();
  }

  // Optional: close menu on outside click
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInsideNav = target.closest('.contact-info') || target.closest('.hamburger-menu');
    if (!clickedInsideNav) {
      this.closeMobileMenu();
    }
  }
}
