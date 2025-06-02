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

  // Calendar - Fixed implementation
  selectedDate: Date | null = null;
  today = new Date();
  currentMonth = new Date();
  nextMonth = new Date();
  dateOpen = false;
  calendarDays: { [key: string]: (Date | null)[] } = {};

  // Room & Guest
  rooms = [{ adults: 2, children: 0, childrenAges: [] as number[] }];
  roomGuestOpen = false;
  ageRange = Array.from({ length: 12 }, (_, i) => i + 1);

  // Filter
  dropdownOpen = false;
  durationRange: [number, number] = [2, 8];
  budgetRange: [number, number] = [10000, 45000];
  flightOption: 'with' | 'without' | '' = '';
  hotelCategories = [
    { label: '<3★', checked: false },
    { label: '3★', checked: false },
    { label: '4★', checked: true },
    { label: '5★', checked: false }
  ];
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

  // Fixed Calendar Implementation
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
//   getMonthKey(index: number, month: Date): string {
//   return month.getFullYear() + '-' + month.getMonth();
// }
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
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days of the month
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

  isDateDisabled(date: Date | null): boolean {
    if (!date) return true;
    return date < this.today;
  }

  isDateSelected(date: Date | null): boolean {
    if (!date || !this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  // Room & Guest functions
  toggleRoomGuest(event: Event) {
    event.stopPropagation();
    this.closeOtherDropdowns('room');
    this.roomGuestOpen = !this.roomGuestOpen;
  }

  applyRoomGuest() {
    this.roomGuestOpen = false;
  }

  changeGuests(index: number, type: 'adults' | 'children', delta: number) {
    const room = this.rooms[index];
    const newValue = room[type] + delta;
    
    if (type === 'adults') {
      if (newValue >= 1 && newValue <= 4) {
        room.adults = newValue;
      }
    } else if (type === 'children') {
      if (newValue >= 0 && newValue <= 3) {
        const oldChildren = room.children;
        room.children = newValue;
        
        // Adjust children ages array
        if (newValue > oldChildren) {
          // Add ages for new children
          for (let i = oldChildren; i < newValue; i++) {
            room.childrenAges.push(1);
          }
        } else {
          // Remove ages for removed children
          room.childrenAges = room.childrenAges.slice(0, newValue);
        }
      }
    }
  }

  addRoom() {
    if (this.rooms.length < 4) {
      this.rooms.push({ adults: 2, children: 0, childrenAges: [] });
    }
  }

  removeRoom(index: number) {
    if (this.rooms.length > 1) {
      this.rooms.splice(index, 1);
    }
  }

  get totalAdults(): number {
    return this.rooms.reduce((sum, r) => sum + r.adults, 0);
  }

  get totalChildren(): number {
    return this.rooms.reduce((sum, r) => sum + r.children, 0);
  }

  // Filter dropdown
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.closeOtherDropdowns('filter');
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeOtherDropdowns(except?: string) {
    if (except !== 'date') this.dateOpen = false;
    if (except !== 'room') this.roomGuestOpen = false;
    if (except !== 'filter') this.dropdownOpen = false;
  }

  selectedHotels(): string[] {
    return this.hotelCategories.filter((h) => h.checked).map((h) => h.label);
  }

  hasActiveFilters(): boolean {
    return (
      !!this.flightOption ||
      this.durationRange[0] !== 2 ||
      this.durationRange[1] !== 8 ||
      this.budgetRange[0] !== 10000 ||
      this.budgetRange[1] !== 45000 ||
      this.selectedHotels().length > 0
    );
  }

  applyFilters() {
    this.dropdownOpen = false;

    // Build visual filter chips
    const chips: { label: string; type: string }[] = [];

    if (this.flightOption) {
      chips.push({
        label: this.flightOption === 'with' ? 'With Flights' : 'Without Flights',
        type: 'flightOption'
      });
    }

    this.selectedHotels().forEach(hotel => {
      chips.push({ label: hotel, type: 'hotelCategories' });
    });

    this.filterChips = chips;

    this.displayedFilters = {
      duration: this.durationRange,
      budget: this.budgetRange,
      hotelCategories: this.selectedHotels(),
      flightOption: this.flightOption
    };

    this.searchTours();
  }

  removeFilter(type: string, label: string) {
    switch (type) {
      case 'flightOption':
        this.flightOption = '';
        break;
      case 'hotelCategories':
        const cat = this.hotelCategories.find(h => h.label === label);
        if (cat) cat.checked = false;
        break;
    }

    this.applyFilters();
  }

  searchTours() {
    const payload = {
      fromCity: this.fromCity,
      destination: this.selectedDestination?.title,
      location: this.selectedLocation,
      category: this.selectedCategory,
      departureDate: this.selectedDate,
      adults: this.totalAdults,
      children: this.totalChildren,
      rooms: this.rooms.length,
      duration: this.durationRange,
      budget: this.budgetRange,
      flights: this.flightOption,
      hotelCategories: this.selectedHotels()
    };

    console.log('Search Initiated with:', payload);
    this.searchTriggered.emit(payload);
  }

  onDestinationChange() {
    this.selectedLocation = null;
  }

  setFlightOption(option: 'with' | 'without') {
    this.flightOption = this.flightOption === option ? '' : option;
  }

  closeAllDropdowns() {
    this.dateOpen = false;
    this.roomGuestOpen = false;
    this.dropdownOpen = false;
  }

  // Utility methods for better UX
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

  getRoomGuestSummary(): string {
    const adults = this.totalAdults;
    const children = this.totalChildren;
    const rooms = this.rooms.length;
    
    let summary = `${adults} Adult${adults > 1 ? 's' : ''}`;
    if (children > 0) {
      summary += `, ${children} Child${children > 1 ? 'ren' : ''}`;
    }
    summary += ` • ${rooms} Room${rooms > 1 ? 's' : ''}`;
    
    return summary;
  }

  // Track by functions for better performance
  trackByDate(index: number, date: Date | null): string {
    return date ? date.toISOString() : `empty-${index}`;
  }

  trackByMonth(index: number, month: Date): string {
    return this.getMonthKey(month);
  }

  // Clear all filters method
  clearAllFilters() {
    this.durationRange = [2, 8];
    this.budgetRange = [10000, 45000];
    this.flightOption = '';
    this.hotelCategories.forEach(cat => cat.checked = false);
    this.hotelCategories.find(cat => cat.label === '4★')!.checked = true; // Reset to default
    this.filterChips = [];
    this.displayedFilters = null;
  }

}