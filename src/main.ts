import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
      // importProvidersFrom(HttpClientModule),
  ],
}).catch((err) => console.error(err));