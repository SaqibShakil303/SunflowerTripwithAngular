import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

interface Destination {
  id: number;
  name: string;
  image: File | null | string;
  bestTime: string;
  weather: string;
  currency: string;
  languages: string[];
  timeZone: string;
  description: string;
  continent?: string;
}

@Component({
  selector: 'app-edit-destination',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.scss']
})
export class EditDestinationComponent implements OnInit {
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
    private dialogRef: MatDialogRef<EditDestinationComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: Destination
  ) {
    this.destinationForm = this.createForm();
  }

  ngOnInit(): void {
    this.populateForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      id: [null, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      continent: ['', [Validators.required]],
      image: [null], // Optional for editing
      bestTime: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      weather: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      currency: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      languages: [[], [Validators.required, Validators.minLength(1)]],
      timeZone: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }

  private populateForm(): void {
    const { id, name, continent, image, bestTime, weather, currency, languages, timeZone, description } = this.data;
    this.destinationForm.patchValue({
      id,
      name,
      continent,
      bestTime,
      weather,
      currency,
      languages: [...(languages || [])],
      timeZone,
      description
    });

    // Handle existing image
    if (typeof image === 'string' && image) {
      this.imagePreview = image;
      this.destinationForm.get('image')?.setValue(null); // No new file selected
      this.cdr.detectChanges();
    } else if (image instanceof File) {
      this.destinationForm.get('image')?.setValue(image);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.onerror = () => {
        this.imagePreview = null;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(image);
    } else {
      this.imagePreview = null;
      this.cdr.detectChanges();
    }
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
        this.cdr.detectChanges();
        return;
      }

      imageControl?.setErrors(null);
      imageControl?.setValue(file);
      imageControl?.markAsDirty();
      imageControl?.markAsTouched();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.cdr.detectChanges();
      };
      reader.onerror = () => {
        imageControl?.setErrors({ readError: true });
        this.imagePreview = null;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    } else {
      imageControl?.setValue(null);
      this.imagePreview = typeof this.data.image === 'string' ? this.data.image : null;
      this.cdr.detectChanges();
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
        const updatedDestination: Destination = {
          id: formValue.id,
          name: formValue.name,
          continent: formValue.continent,
          image: formValue.image || this.data.image, // Keep existing image if no new file
          bestTime: formValue.bestTime,
          weather: formValue.weather,
          currency: formValue.currency,
          languages: formValue.languages,
          timeZone: formValue.timeZone,
          description: formValue.description
        };

        this.dialogRef.close(updatedDestination);
        this.isSubmitting = false;
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