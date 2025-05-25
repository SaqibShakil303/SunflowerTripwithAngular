import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments.dev';
import { Destination } from '../../models/destination.model';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

 constructor(private http: HttpClient,
    @Inject(PLATFORM_ID
    ) private platformId: Object
  ) { }
private APIurl =environment.apiDomain
 getDestinationDetails(id: number): Observable<Destination> {
  return this.http.get<Destination>(`${this.APIurl}/Destination/${id}/details`);
}

}
