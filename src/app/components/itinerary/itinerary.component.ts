import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import AOS from 'aos';
import { FooterComponent } from '../../common/footer/footer.component';
import { HeaderComponent } from "../../common/header/header.component";

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, HeaderComponent],
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements AfterViewInit {
  itineraryForm: FormGroup;
 
  constructor(private fb: FormBuilder,@Inject(PLATFORM_ID) private platformId: Object)
  
  
  
  {
    this.itineraryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      destination: [''],
      travelers: [1, [Validators.required, Validators.min(1)]],
      duration: [1, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      budget: ['', Validators.required],
      preferences: ['']
    });
  }
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        once: true
      });
    }
  }

  onSubmit() {
    if (this.itineraryForm.valid) {
      console.log('Itinerary Form Submitted:', this.itineraryForm.value);
      // Implement submission logic (e.g., API call)
    }
  }
}