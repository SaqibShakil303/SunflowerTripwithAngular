import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { TopPicksComponent } from './components/top-picks/top-picks.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { ItineraryComponent } from './components/itinerary/itinerary.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { ContactComponent } from './components/contact/contact.component';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
  { path: 'itinerary', component: ItineraryComponent },
  {path:'contact', component: ContactComponent},
    // { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', redirectTo: '' },
    {path: '',
    component: HomeComponent,
    children: [
      { path: 'about', component: AboutComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'destinations', component: DestinationsComponent },
      { path: 'why-us', component: WhyUsComponent },
      { path: 'top-picks', component: TopPicksComponent },
      { path: 'testimonials', component: TestimonialsComponent },
      { path: 'itinerary', component: ItineraryComponent },
      { path: 'newsletter', component: NewsletterComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'map', component: MapComponent },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ]
}
];
