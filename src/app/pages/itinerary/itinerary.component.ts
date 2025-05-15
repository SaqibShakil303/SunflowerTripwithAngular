import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { FooterComponent } from '../../common/footer/footer.component';
import { HeaderComponent } from "../../common/header/header.component";
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ContactService } from '../../services/contact/contact.service';
import { Itinerary } from '../../models/itinerary.model';

@Component({
  selector: 'app-itinerary',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, HeaderComponent],
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss'],
  animations: [
      trigger('fadeInUp', [
        transition(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ]),
      trigger('fadeInStagger', [
        transition(':enter', [
          query(':enter', [
            style({ opacity: 0, transform: 'translateY(30px)' }),
            stagger(150, [
              animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
          ], { optional: true })
        ])
      ])
    ]
})
export class ItineraryComponent implements AfterViewInit {
  itineraryForm: FormGroup;
   isSubmitted = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

    get childAges(): FormArray {
    return this.itineraryForm.get('childAges') as FormArray;
  }
  constructor(private fb: FormBuilder,private contactService: ContactService )
  {
       this.itineraryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      destination: [''],
      travelers: [1, [Validators.required, Validators.min(1)]],
      children: [0, [Validators.min(0)]],
      childAges: this.fb.array([]),
      duration: [1, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      budget: ['', Validators.required],
      hotelCategory: ['', Validators.required],
      travelType: ['', Validators.required],
      occupation: ['', Validators.required],
      preferences: ['']
    });

    this.itineraryForm.get('children')!.valueChanges.subscribe(count => {
      const ages = this.childAges;
      while (ages.length !== count) {
        if (ages.length < count) {
          ages.push(this.fb.control('', Validators.required));
        } else {
          ages.removeAt(ages.length - 1);
        }
      }
    });
  }

  ngAfterViewInit() {
  
  }

  onSubmit() {
        this.isSubmitted = true;
    this.errorMessage = '';
    this.successMessage = '';
    if (this.itineraryForm.valid) {
     this.isLoading = true;
       const formData = new Itinerary();
       formData.name = this.itineraryForm.value.name;
       formData.email = this.itineraryForm.value.email.trim().toLowerCase();
        formData.phone = this.itineraryForm.value.phone.trim();
        formData.destination = this.itineraryForm.value.destination.trim();
        formData.travelers = this.itineraryForm.value.travelers;
        formData.children = this.itineraryForm.value.children;
        formData.childAges = this.itineraryForm.value.childAges.map((age: number) => age);
        formData.duration = this.itineraryForm.value.duration;
        formData.date = this.itineraryForm.value.date;
        formData.budget = this.itineraryForm.value.budget;
        formData.hotelCategory = this.itineraryForm.value.hotelCategory;
        formData.travelType = this.itineraryForm.value.travelType;
        formData.occupation = this.itineraryForm.value.occupation;
        formData.preferences = this.itineraryForm.value.preferences.trim();
      
          if (this.validateFormData(formData)) {
        this.submitForm(formData);
      } else {
        this.errorMessage = 'Please fill in all required fields correctly.';
        this.isLoading = false;
      }
    } else {
      this.errorMessage = 'Please correct the errors in the form.';
      this.markFormGroupTouched(this.itineraryForm);
    }
  }

  private validateFormData(formData: Itinerary): boolean {
    return !!(
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.budget &&
      formData.travelType.length&&
      formData.date
    );
  }

  private submitForm(formData: Itinerary): void {
    this.contactService.submitItineraryDetail(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Your message has been sent successfully!';
        this.itineraryForm.reset();
        this.isSubmitted = false;
        console.log('Form submission successful:', response);
      },
      error: (error) => {
        this.errorMessage = 'Failed to send your message. Please try again later.';
        console.error('Error in form submission:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  // Utility method to mark all fields as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Reset form
  resetForm(): void {
    this.itineraryForm.reset();
    this.isSubmitted = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

      // console.log('Itinerary Form Submitted:', this.itineraryForm.value);
      // Implement submission logic (e.g., API call)
    }
