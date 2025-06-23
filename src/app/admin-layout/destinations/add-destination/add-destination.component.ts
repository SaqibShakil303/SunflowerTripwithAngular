import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

interface Destination {
  id: number;
  name: string;
  type: 'Country' | 'Continent';
  image: string;
  bestTime: string;
  weather: string;
  currency: string;
  languages: string[];
  timeZone: string;
  description: string;
  continent?: string;
}

@Component({
  selector: 'app-add-destination',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.scss']
})
export class AddDestinationComponent implements OnInit {
  destinationForm: FormGroup;
  languageInput: string = '';
  isSubmitting: boolean = false;

  continents = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America',
    'Australia/Oceania',
    'Antarctica'
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDestinationComponent>
  ) {
    this.destinationForm = this.createForm();
  }

  ngOnInit(): void {}

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      type: ['Country', [Validators.required]],
      continent: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)]],
      bestTime: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      weather: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      currency: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      languages: [[], [Validators.required, Validators.minLength(1)]],
      timeZone: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  // Language management
  addLanguage(): void {
    if (this.languageInput.trim()) {
      const currentLanguages = this.destinationForm.get('languages')?.value || [];
      const newLanguage = this.languageInput.trim();
      
      if (!currentLanguages.includes(newLanguage)) {
        const updatedLanguages = [...currentLanguages, newLanguage];
        this.destinationForm.patchValue({ languages: updatedLanguages });
      }
      
      this.languageInput = '';
    }
  }

  removeLanguage(language: string): void {
    const currentLanguages = this.destinationForm.get('languages')?.value || [];
    const updatedLanguages = currentLanguages.filter((lang: string) => lang !== language);
    this.destinationForm.patchValue({ languages: updatedLanguages });
  }

  onLanguageKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addLanguage();
    }
  }

  // Form validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.destinationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.destinationForm.get(fieldName);
    
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} is required`;
      }
      if (field.errors['minlength']) {
        return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} must not exceed ${field.errors['maxlength'].requiredLength} characters`;
      }
      if (field.errors['pattern']) {
        return 'Please enter a valid image URL (jpg, jpeg, png, gif, webp)';
      }
    }
    
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'name': 'Destination name',
      'type': 'Type',
      'continent': 'Continent',
      'image': 'Image URL',
      'bestTime': 'Best time to visit',
      'weather': 'Weather',
      'currency': 'Currency',
      'languages': 'Languages',
      'timeZone': 'Time zone',
      'description': 'Description'
    };
    return labels[fieldName] || fieldName;
  }

  // Form submission
  onSubmit(): void {
    if (this.destinationForm.valid) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        const formValue = this.destinationForm.value;
        const newDestination: Destination = {
          id: Date.now(), // Generate a simple ID
          ...formValue
        };

        this.dialogRef.close(newDestination);
      }, 1000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.destinationForm.controls).forEach(key => {
        this.destinationForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Image preview functionality
  onImageUrlChange(): void {
    // This will trigger validation automatically due to reactive forms
  }
}