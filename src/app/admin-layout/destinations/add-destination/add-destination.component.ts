import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

interface Destination {
  id: number;
  name: string;
  image: File | null;
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
  imagePreview: string | null = null;

  continents = [
    'Itself a Continent',
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
      continent: ['', [Validators.required]],
      image: [null, [Validators.required]],
      bestTime: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      weather: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      currency: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      languages: [[], [Validators.required, Validators.minLength(1)]],
      timeZone: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  // Image handling
  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const imageControl = this.destinationForm.get('image');

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      if (!validTypes.includes(file.type)) {
        imageControl?.setErrors({ invalidType: true });
        this.imagePreview = null;
        return;
      }

      // Clear any previous errors and set the file
      imageControl?.setErrors(null);
      imageControl?.setValue(file);
      imageControl?.markAsDirty();
      imageControl?.markAsTouched();

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.onerror = () => {
        imageControl?.setErrors({ readError: true });
        this.imagePreview = null;
      };
      reader.readAsDataURL(file);
    } else {
      imageControl?.setValue(null);
      imageControl?.setErrors({ required: true });
      this.imagePreview = null;
    }
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
      if (field.errors['invalidType']) {
        return 'Please select a valid image (PNG, JPG, or JPEG)';
      }
      if (field.errors['readError']) {
        return 'Error reading the image file';
      }
    }
    
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'name': 'Destination name',
      'continent': 'Continent',
      'image': 'Image',
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
          id: Date.now(),
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
}