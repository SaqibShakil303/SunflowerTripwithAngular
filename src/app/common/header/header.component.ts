import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { HttpClient } from '@angular/common/http';
import { DestinationNav, DestinationService } from '../../services/destination/destination.service';

interface NavItem {
  name: string;
  route: string;
  queryParams?: { [key: string]: any };
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

  navGroups: NavGroup[] = [];
 destinationItems: NavItem[] = [];
  locationItems: NavItem[]    = [];
holidayPackages: NavItem[] = [
    { name: 'Holiday Packages', route: '/tours', queryParams: { category: 'holiday' } }
  ];
  groupPackages: NavItem[] = [
    { name: 'Group Packages',   route: '/tours', queryParams: { category: 'group' } }
  ];

  // dealsOffers: NavItem[] = [
  //   { name: 'Last Minute Deals', route: '/last-minute-deals' },
  //   { name: 'Early Bird Offers', route: '/early-bird-offers' },
  //   { name: 'Seasonal Discounts', route: '/seasonal-discounts' }
  // ];
  // will fill these from the API
 
  constructor(private elementRef: ElementRef, private destSvc: DestinationService) {
  }
ngOnInit(): void {
    this.destSvc.getNamesAndLocations().subscribe({
      next: (data: DestinationNav[]) => {
        this.destinationItems = data.map(d => ({
          name: d.title,
          route: '/tours',
          queryParams: { destination: d.id }
        }));
        this.locationItems = data.flatMap(d =>
          d.locations.map(loc => ({
            name: loc.name,
            route: '/tours',
            queryParams: { location: loc.id }
          }))
        );
        this.navGroups = [
          { label: 'Destinations',     items: this.destinationItems },
          { label: 'Cities',        items: this.locationItems    },
          { label: 'Holiday Packages', items: this.holidayPackages },
          { label: 'Group Packages',   items: this.groupPackages   },
        ];
      },
      error: err => console.error('Failed loading nav data', err)
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
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
