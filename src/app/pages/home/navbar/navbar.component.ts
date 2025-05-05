import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuItems = [
    {
      title: 'Holiday Packages',
      subItems: ['Beach Getaways', 'City Breaks', 'Adventure Tours'],
      showDropdown: false
    },
    {
      title: 'Group Packages',
      subItems: ['Family Trips', 'Corporate Retreats', 'Friends Getaways'],
      showDropdown: false
    },
    {
      title: 'Destinations',
      subItems: ['Europe', 'Asia', 'Africa'],
      showDropdown: false
    },
    {
      title: 'Deals & offers',
      subItems: ['Last Minute Deals', 'Early Bird Offers', 'Seasonal Discounts'],
      showDropdown: false
    }
  ];

  showDropdown(item: any) {
    item.showDropdown = true;
  }

  hideDropdown(item: any) {
    item.showDropdown = false;
  }
}
