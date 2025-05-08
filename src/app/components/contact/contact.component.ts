import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import AOS from 'aos';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent, NavbarComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  submitted = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 800,
        once: true
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Add API call or backend submission logic here
      this.contactForm.reset();
      this.submitted = false;
    }
  }
}