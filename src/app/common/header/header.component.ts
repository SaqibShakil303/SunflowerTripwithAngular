// header.component.ts
import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { DestinationNav, DestinationService } from '../../services/destination/destination.service';

interface NavItem {
  name: string;
  route: string;
  queryParams?: { 
    destination?: number;
    location?: number;
    category?: string;
  };
}

interface NavGroup {
  label: string;
  items: NavItem[];
  locations: NavItem[];
}

interface DestinationGroup {
  label: string;
  destinations: {
    name: string;
    route: string;
    queryParams: { destination: number };
    locations: NavItem[];
  }[];
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
  destinationGroup: DestinationGroup = {
    label: 'Destinations',
    destinations: []
  };

  constructor(private elementRef: ElementRef, private destSvc: DestinationService) {}

  ngOnInit(): void {
    this.destSvc.getNamesAndLocations().subscribe({
      next: (data: DestinationNav[]) => {
        // Create destinations group with all destinations and their locations
        this.destinationGroup = {
          label: 'Destinations',
          destinations: data.map(d => ({
            name: d.title,
            route: '/tours',
            queryParams: { destination: d.id },
            locations: d.locations.map(loc => ({
              name: loc.name,
              route: '/tours',
              queryParams: { location: loc.id }
            }))
          }))
        };

        // Keep only package groups in navGroups
        const packageGroups: NavGroup[] = [
          {
            label: 'Holiday Packages',
            items: [{ 
              name: 'Holiday Packages', 
              route: '/tours', 
              queryParams: { category: 'holiday' } 
            }],
            locations: []
          },
          {
            label: 'Group Packages',
            items: [{ 
              name: 'Group Packages', 
              route: '/tours', 
              queryParams: { category: 'group' } 
            }],
            locations: []
          }
        ];

        this.navGroups = packageGroups;
      },
      error: err => console.error('Failed loading nav data', err)
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isMobileMenuOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isMobileMenuOpen = false;
    }
  }

  customizeHoliday() {
    console.log('Customize holiday button clicked');
  }

  toggleDropdown(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const parent = target.closest('.dropdown-mobile');
    if (parent) {
      parent.classList.toggle('active');
    }
  }

  toggleDestinationLocations(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const parent = target.closest('.mobile-destination-item');
    if (parent) {
      parent.classList.toggle('locations-open');
    }
  }
}