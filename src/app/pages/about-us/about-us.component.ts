import { Component } from '@angular/core';
import { TestimonialsComponent } from "../../components/testimonials/testimonials.component";
import { WhyUsComponent } from "../../components/why-us/why-us.component";

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [TestimonialsComponent, WhyUsComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

}
