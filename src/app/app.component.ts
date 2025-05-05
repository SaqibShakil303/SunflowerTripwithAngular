import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './pages/home/hero/hero.component';
import { NavbarComponent } from './pages/home/navbar/navbar.component';
import { ServicesComponent } from './pages/home/services/services.component';
import { ReviewsComponent } from './pages/home/reviews/reviews.component';
import { ContactComponent } from './pages/home/contact/contact.component';
import { AboutComponent } from './pages/home/about/about.component';
import { GalleryComponent } from './pages/home/gallery/gallery.component';
import { FooterComponent } from './pages/home/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent],
  // [RouterOutlet,HeroComponent,NavbarComponent,ServicesComponent,ReviewsComponent,ContactComponent,AboutComponent,GalleryComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sunflowertrip';
}
