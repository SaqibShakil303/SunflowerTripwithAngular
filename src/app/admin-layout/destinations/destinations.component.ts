import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddDestinationComponent } from './add-destination/add-destination.component';
import { EditDestinationComponent } from './edit-destination/edit-destination.component';

// Destination interface
interface Destination {
  id: number;
  name: string;
  image: string | File | null;
  bestTime: string;
  weather: string;
  currency: string;
  languages: string[];
  timeZone: string;
  description: string;
  continent?: string;
  showDetails?: boolean;
  isDeleting?: boolean;
}

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent implements OnInit {
  // Search and filtering
  searchTerm: string = '';

  // Sorting
  sortBy: string = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  // Data arrays
  destinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  paginatedDestinations: Destination[] = [];

  // Modal state
  showDeleteModal: boolean = false;
  destinationToDelete: Destination | null = null;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadDestinations();
    this.applyFiltersAndSort();
  }

  // Load sample destinations data
  private loadDestinations(): void {
    this.destinations = [
      {
        id: 1,
        name: 'Paris',
        // type: 'Country',
        continent: 'Europe',
        image: 'https://images.unsplash.com/photo-1524396309943-e03f5249f002?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bestTime: 'April-October',
        weather: 'Temperate oceanic',
        currency: 'Euro (EUR)',
        languages: ['French'],
        timeZone: 'CET (UTC+1)',
        description: 'The City of Light, known for its art, fashion, gastronomy, and culture. Home to iconic landmarks like the Eiffel Tower and Louvre Museum.'
      },
      {
        id: 2,
        name: 'Tokyo',
        // type: 'Country',
        continent: 'Asia',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop',
        bestTime: 'March-May, September-November',
        weather: 'Humid subtropical',
        currency: 'Japanese Yen (JPY)',
        languages: ['Japanese'],
        timeZone: 'JST (UTC+9)',
        description: 'A bustling metropolis blending traditional culture with cutting-edge technology. Famous for its cuisine, temples, and vibrant city life.'
      },
      {
        id: 3,
        name: 'New York City',
        // type: 'Country',
        continent: 'North America',
        image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop',
        bestTime: 'April-June, September-November',
        weather: 'Humid continental',
        currency: 'US Dollar (USD)',
        languages: ['English'],
        timeZone: 'EST (UTC-5)',
        description: 'The Big Apple, a global hub for finance, arts, fashion, and culture. Home to iconic landmarks like Times Square and Central Park.'
      },
      {
        id: 4,
        name: 'Bali',
        // type: 'Country',
        continent: 'Asia',
        image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop',
        bestTime: 'April-October',
        weather: 'Tropical',
        currency: 'Indonesian Rupiah (IDR)',
        languages: ['Indonesian', 'Balinese'],
        timeZone: 'WITA (UTC+8)',
        description: 'An Indonesian paradise known for its beautiful beaches, Hindu temples, lush rice terraces, and vibrant culture.'
      },
      {
        id: 5,
        name: 'London',
        // type: 'Country',
        continent: 'Europe',
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&h=200&fit=crop',
        bestTime: 'May-September',
        weather: 'Temperate oceanic',
        currency: 'British Pound (GBP)',
        languages: ['English'],
        timeZone: 'GMT (UTC+0)',
        description: 'A historic city rich in culture, with world-class museums, royal palaces, and a thriving arts scene.'
      }
    ];
  }

  // Search functionality
  onSearch(): void {
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  // Sorting functionality
  onSort(): void {
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.onSort();
  }

  // Apply filters and sorting
  private applyFiltersAndSort(): void {
    // Filter destinations based on search term
    this.filteredDestinations = this.destinations.filter(destination =>
      destination.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      destination.continent?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      // destination.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      destination.bestTime.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    // Sort destinations
    this.filteredDestinations.sort((a, b) => {
      let aValue: string;
      let bValue: string;

      switch (this.sortBy) {
        case 'continent':
          aValue = a.continent || '';
          bValue = b.continent || '';
          break;
        case 'bestTime':
          aValue = a.bestTime;
          bValue = b.bestTime;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      const comparison = aValue.localeCompare(bValue);
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });

    this.updatePagination();
  }

  // Pagination functionality
  private updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedDestinations = this.filteredDestinations.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredDestinations.length / this.pageSize);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.pageSize, this.filteredDestinations.length);
  }

  getSerialNumber(index: number): number {
    return this.getStartIndex() + index + 1;
  }

  // Details functionality
  toggleDetails(destination: Destination): void {
    destination.showDetails = !destination.showDetails;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDestinationComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the destination
          
      }
    });
  }

  // Edit functionality
  openEditDialog(destination: Destination): void {
    const dialogRef = this.dialog.open(EditDestinationComponent, {
      width: '600px',
      data: { ...destination } // Pass a copy of the destination data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the destination in the destinations array
        const index = this.destinations.findIndex(d => d.id === result.id);
        if (index !== -1) {
          this.destinations[index] = result;
          this.applyFiltersAndSort();
        }
      }
    });
  }

  // Delete functionality
  deleteDestination(destination: Destination): void {
    this.destinationToDelete = destination;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.destinationToDelete) {
      // Set deleting state
      this.destinationToDelete.isDeleting = true;

      // Simulate API call delay
      setTimeout(() => {
        if (this.destinationToDelete) {
          // Remove from destinations array
          this.destinations = this.destinations.filter(d => d.id !== this.destinationToDelete!.id);

          // Reapply filters and update pagination
          this.applyFiltersAndSort();

          // Adjust current page if necessary
          const totalPages = this.getTotalPages();
          if (this.currentPage > totalPages && totalPages > 0) {
            this.currentPage = totalPages;
            this.updatePagination();
          }
        }

        this.cancelDelete();
      }, 1000);
    }
  }

  cancelDelete(): void {
    if (this.destinationToDelete) {
      this.destinationToDelete.isDeleting = false;
    }
    this.showDeleteModal = false;
    this.destinationToDelete = null;
  }

  // Refresh functionality
  refreshDestinations(): void {
    // Simulate refreshing data
    this.loadDestinations();
    this.searchTerm = '';
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }

  // TrackBy function for ngFor performance
  trackByDestinationId(index: number, destination: Destination): number {
    return destination.id;
  }
}