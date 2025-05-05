import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AnimationDirective } from '../../directives/animation.directive';
import { ProductSliderComponent } from '../product-slider/product-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, AnimationDirective, ProductSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Any additional initialization if needed
  }
}