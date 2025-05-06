import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  HeaderComponent,FooterComponent, ChatWidgetComponent],
  // [RouterOutlet,HeroComponent,NavbarComponent,ServicesComponent,ReviewsComponent,ContactComponent,AboutComponent,GalleryComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sunflowertrip';
}
