import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments.dev';
import { Tour } from '../../models/tour.model';

// export interface Tour {
//   id: number;
//   title: string;
//   slug: string;
//   location: string;
//   description: string;
//   price: number;
//   image_url: string;
// }

@Injectable({
  providedIn: 'root'
})
export class TourService {

    constructor(private http: HttpClient,
      @Inject(PLATFORM_ID) private platformId: Object
    ) { }
 
  private apiUrl = environment.apiDomain;

getTourBySlug(slug: string): Observable<Tour> {
  return this.http.get<Tour>(`${this.apiUrl}/Tours/${slug}`);
}
  searchTours(query: string): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/Tours/search/q?q=${query}`);
  }

  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/Tours`);
  }
   getByDestination(destId: number): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/Tours/${destId}/destination`);
  }

  getByLocation(locId: number): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/Tours/${locId}/location`);
  }
  getByCategory(category: string): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/Tours/category/${category}`);
  }
}
