import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { HeaderComponent } from "../../common/header/header.component";
import { FooterComponent } from "../../common/footer/footer.component";
import { NavbarComponent } from "../../common/navbar/navbar.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent, NavbarComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
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
export class ContactComponent implements AfterViewInit {

  submitted = false;
  success = false;
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });


  contactFields = [
    { name: 'name', label: 'Your Name', id: 'contact-name', type: 'text', placeholder: 'Full name', error: 'Name is required' },
    { name: 'email', label: 'Email Address', id: 'contact-email', type: 'email', placeholder: 'you@example.com', error: 'Valid email is required' },
    { name: 'phone', label: 'Phone Number', id: 'contact-phone', type: 'tel', placeholder: '10-digit phone number', error: 'Valid phone is required' },
    { name: 'subject', label: 'Subject', id: 'contact-subject', type: 'text', placeholder: 'e.g. Booking inquiry', error: 'Subject is required' },
    { name: 'message', label: 'Message', id: 'contact-message', textarea: true, placeholder: 'How can we help?', error: 'Message is required' }
  ];
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {

  }

  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
      this.success = true;
      this.contactForm.reset();
      this.submitted = false;

      setTimeout(() => (this.success = false), 5000);
    }
  }
  
  toggleFaq(faq: any): void {
    // Close all other FAQs
    this.faqs.forEach(item => {
      if (item !== faq) {
        item.isOpen = false;
      }
    });
    faq.isOpen = !faq.isOpen;
  }
  faqs = [
    {
      question: 'Can I customize my travel package?',
      answer: 'Yes, all our packages are fully customizable based on your preferences. Our travel experts will work with you to create a personalized itinerary that suits your interests, budget, and time constraints.',
      isOpen: false
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'We offer flexible cancellation depending on the package and timeframe. Generally, cancellations made 30 days before departure receive a full refund, while cancellations between 15-29 days receive a 50% refund. Please check your specific package details for exact terms.',
      isOpen: false
    },
    {
      question: 'Do you arrange visa assistance?',
      answer: 'Yes, we provide comprehensive visa assistance including documentation guidance, application form filling, and appointment scheduling for most destinations. Our team keeps updated with the latest visa requirements to ensure a smooth process.',
      isOpen: false
    },
    {
      question: 'Is travel insurance included in your packages?',
      answer: 'Basic travel insurance is included in all our international packages. However, we recommend upgrading to our premium insurance options for extended coverage including higher medical benefits, trip cancellation protection, and coverage for adventure activities.',
      isOpen: false
    },
    {
      question: 'How many people are typically in a group tour?',
      answer: 'Our standard group tours typically have 8-16 participants to ensure personal attention and comfort. For specialized tours and expeditions, group sizes may vary. Private tours are also available for those seeking a more exclusive experience.',
      isOpen: false
    }
  ];
}