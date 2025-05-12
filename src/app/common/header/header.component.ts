import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";

interface NavItem {
  name: string;
  route: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isNavActive = false;
  isMobileMenuOpen = false;

  // Nav groups to simplify dropdown handling
  navGroups: NavGroup[] = [];

  holidayPackages: NavItem[] = [
    { name: 'Beach Getaways', route: '/beach-getaways' },
    { name: 'City Breaks', route: '/city-breaks' },
    { name: 'Adventure Tours', route: '/adventure-tours' }
  ];

  groupPackages: NavItem[] = [
    { name: 'Family Trips', route: '/family-trips' },
    { name: 'Corporate Retreats', route: '/corporate-retreats' },
    { name: 'Friends Getaways', route: '/friends-getaways' }
  ];

  destinations: NavItem[] = [
    { name: 'Europe', route: '/europe' },
    { name: 'Asia', route: '/asia' },
    { name: 'Africa', route: '/africa' }
  ];

  dealsOffers: NavItem[] = [
    { name: 'Last Minute Deals', route: '/last-minute-deals' },
    { name: 'Early Bird Offers', route: '/early-bird-offers' },
    { name: 'Seasonal Discounts', route: '/seasonal-discounts' }
  ];

  constructor(private elementRef: ElementRef) {
    // Populate the grouped navigation structure
    this.navGroups = [
      { label: 'Holiday Packages', items: this.holidayPackages },
      { label: 'Group Packages', items: this.groupPackages },
      { label: 'Destinations', items: this.destinations },
      { label: 'Deals & offers', items: this.dealsOffers }
    ];
  }

  // Toggle mobile menu visibility
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  // Close mobile menu if clicked outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMobileMenuOpen = false;
    }
  }

  // Triggered by customize button
  customizeHoliday() {
    console.log('Customize holiday button clicked');
    // Future implementation logic
  }

  // Toggle dropdown visibility on mobile
  toggleDropdown(event: Event) {
    const parent = (event.currentTarget as HTMLElement).closest('.dropdown-mobile');
    parent?.classList.toggle('active');
  }
}
