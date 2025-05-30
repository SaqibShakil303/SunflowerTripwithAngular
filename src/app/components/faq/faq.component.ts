import { Component, ElementRef, Renderer2 } from '@angular/core';
import {
  trigger, transition, style, animate, query, stagger
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  animations: [
    // fade+up on the header
    trigger('headerAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),

    // stagger in the FAQ items from left
    trigger('listStagger', [
      transition(':enter', [
        query('.faq-item', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(200, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ]),

    // fade in contact
    trigger('contactAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms 1s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class FAQComponent {
  faqs = [
    { question: 'What is your minimum order?', answer: '…' },
    { question: 'How do I get a quote?',      answer: '…' },
    /* etc */
  ];

  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  toggleFaq(event: MouseEvent): void {
    const questionEl = event.currentTarget as HTMLElement;
    const faqItem = questionEl.parentElement!;
    const isActive = faqItem.classList.contains('active');

    this.elRef.nativeElement
      .querySelectorAll('.faq-item')
      .forEach((el: HTMLElement) => this.renderer.removeClass(el, 'active'));

    if (!isActive) {
      this.renderer.addClass(faqItem, 'active');
    }
  }
}
