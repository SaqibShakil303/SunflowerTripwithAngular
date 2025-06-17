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

interface Destination {
  image_url?: string;
  name: string;
  route: string;
  queryParams?: { destination: number };
  locations: NavItem[];
}

interface DestinationGroup {
  label: string;
  destinations: Destination[];
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  isDropdownOpen = false;
  selectedContinent: Destination | null = null;
  navGroups: NavGroup[] = [];
  destinationGroup: DestinationGroup = {
    label: 'Destinations',
    destinations: []
  };

  constructor(private elementRef: ElementRef, private destSvc: DestinationService) {}

  ngOnInit(): void {
    this.destSvc.getDestinationNames().subscribe({
      next: (destinations) => {
        const continents = destinations.filter(d => d.parent_id === null);
        const countries = destinations.filter(d => d.parent_id !== null);

        const continentImages: { [key: string]: string } = {
          'Europe & Britain': 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
          'North America': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62dffe?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3',
          'South America': 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
          'Africa': 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3',
          'Asia': 'https://images.unsplash.com/photo-1528164344705-7dc57c5566d4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
          'Australia & New Zealand': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
        };

        this.destinationGroup = {
          label: 'Destinations',
          destinations: continents.map(continent => ({
            name: continent.title,
            route: `/destination/${continent.title}`,
            image_url:continent.image_url || continentImages[continent.title] || '',
            locations: countries
              .filter(country => country.parent_id === continent.id)
              .map(country => ({
                name: country.title,
            
                route: `/destination/${country.title}`,
              }))
          }))
        };

        if (this.destinationGroup.destinations.length > 0) {
          this.selectedContinent = this.destinationGroup.destinations[0];
        }

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
      error: err => console.error('Failed to load destinations', err)
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openDropdown() {
    this.isDropdownOpen = true;
  }

  toggleDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.dropdown-label')) {
      this.isDropdownOpen = !this.isDropdownOpen;
      event.stopPropagation();
    }
  }

  selectContinent(destination: Destination) {
    this.selectedContinent = destination;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isMobileMenuOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isMobileMenuOpen = false;
    }
    if (this.isDropdownOpen && !this.elementRef.nativeElement.querySelector('.dropdown-nav').contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }

  customizeHoliday() {
    console.log('Customize holiday button clicked');
  }

  toggleDestinationLocations(event: Event) {
    const target = event.currentTarget as HTMLElement;
    const parent = target.closest('.mobile-destination-item');
    if (parent) {
      parent.classList.toggle('locations-open');
    }
  }
}