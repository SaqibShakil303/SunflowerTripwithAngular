import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DestinationService } from '../../services/destination/destination.service';
import { TourService } from '../../services/tours/tour.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-tour-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ClickOutsideDirective],
  templateUrl: './tour-filter.component.html',
  styleUrl: './tour-filter.component.scss'
})
export class TourFilterComponent implements OnInit {
  @Output() searchTriggered = new EventEmitter<any>();
  
  // City & Destination
  fromCity: string = 'Kolkata';
  fromCityCountry: string = 'India';
  destinations: any[] = [];
  categories: string[] = [];
  selectedDestination: any = null;
  selectedLocation: string | null = null;
  selectedCategory: string | null = null;
  displayedFilters: any = null;

  // Calendar
  selectedDate: Date | null = null;
  today = new Date();
  currentMonth = new Date();
  nextMonth = new Date();
  dateOpen = false;
  calendarDays: { [key: string]: (Date | null)[] } = {};

  // Filter
  dropdownOpen = false;
  durationRange: [number, number] = [2, 8];
  budgetRange: [number, number] = [10000, 45000];
  filterChips: { label: string; type: string }[] = [];

  constructor(
    private destSvc: DestinationService,
    private toursSvc: TourService
  ) {
    this.initializeCalendar();
  }

  ngOnInit() {
    this.destSvc.getNamesAndLocations().subscribe({
      next: (data) => (this.destinations = data),
      error: (err) => console.error('Failed loading destinations', err)
    });

    this.toursSvc.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Failed loading categories', err)
    });
  }

  // Calendar Implementation
  initializeCalendar() {
    const now = new Date();
    this.currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    this.nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    this.generateCalendarDays();
  }

  generateCalendarDays() {
    this.calendarDays = {};
    [this.currentMonth, this.nextMonth].forEach(month => {
      const key = this.getMonthKey(month);
      this.calendarDays[key] = this.calculateDaysForMonth(month);
    });
  }

  getMonthKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}`;
  }

  calculateDaysForMonth(monthDate: Date): (Date | null)[] {
    const days: (Date | null)[] = [];
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  }

  toggleDate(event: Event) {
    event.stopPropagation();
    this.closeOtherDropdowns('date');
    this.dateOpen = !this.dateOpen;
    
    if (this.dateOpen) {
      this.generateCalendarDays();
    }
  }

  selectDate(date: Date | null) {
    if (!date || date < this.today) return;
    
    this.selectedDate = new Date(date);
    setTimeout(() => {
      this.dateOpen = false;
    }, 100);
  }

  getDayName(): string {
    if (!this.selectedDate) return '';
    return this.selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  }

  getMonthYear(date: Date): string {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  getCalendarDays(monthDate: Date): (Date | null)[] {
    const key = this.getMonthKey(monthDate);
    return this.calendarDays[key] || [];
  }

  // Filter dropdown
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.closeOtherDropdowns('filter');
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeOtherDropdowns(except?: string) {
    if (except !== 'date') this.dateOpen = false;
    if (except !== 'filter') this.dropdownOpen = false;
  }

  hasActiveFilters(): boolean {
    return (
      this.durationRange[0] !== 2 ||
      this.durationRange[1] !== 8 ||
      this.budgetRange[0] !== 10000 ||
      this.budgetRange[1] !== 45000
    );
  }

  applyFilters() {
    this.dropdownOpen = false;

    const chips: { label: string; type: string }[] = [];

    if (this.durationRange[0] !== 2 || this.durationRange[1] !== 8) {
      chips.push({ label: `${this.durationRange[0]}-${this.durationRange[1]} nights`, type: 'duration' });
    }
    if (this.budgetRange[0] !== 10000 || this.budgetRange[1] !== 45000) {
      chips.push({ label: `₹${this.budgetRange[0]} - ₹${this.budgetRange[1]}`, type: 'budget' });
    }

    this.filterChips = chips;

    this.displayedFilters = {
      duration: this.durationRange,
      budget: this.budgetRange
    };

    this.searchTours();
  }

  removeFilter(type: string, label: string) {
    switch (type) {
      case 'duration':
        this.durationRange = [2, 8];
        break;
      case 'budget':
        this.budgetRange = [10000, 45000];
        break;
    }
    this.applyFilters();
  }

  searchTours() {
    const payload = {
      destination_id: this.selectedDestination?.id || '',
      min_price: this.budgetRange[0],
      max_price: this.budgetRange[1],
      min_duration: this.durationRange[0],
      max_duration: this.durationRange[1],
      available_from: this.selectedDate ? this.selectedDate.toISOString().split('T')[0] : '',
      available_to: this.selectedDate ? this.selectedDate.toISOString().split('T')[0] : '',
      location: this.selectedLocation,
      fromCity: this.fromCity
    };
    console.log('Search Initiated with:', payload);
    this.searchTriggered.emit(payload);
  }

  onDestinationChange() {
    this.selectedLocation = null;
  }

  closeAllDropdowns() {
    this.dateOpen = false;
    this.dropdownOpen = false;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  }

  getFormattedDateDisplay(): string {
    if (!this.selectedDate) return 'Select Date';
    return this.formatDate(this.selectedDate);
  }

  trackByDate(index: number, date: Date | null): string {
    return date ? date.toISOString() : `empty-${index}`;
  }

  trackByMonth(index: number, month: Date): string {
    return this.getMonthKey(month);
  }

  clearAllFilters() {
    this.durationRange = [2, 8];
    this.budgetRange = [10000, 45000];
    this.filterChips = [];
    this.displayedFilters = null;
  }
}