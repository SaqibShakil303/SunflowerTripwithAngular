import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments.dev';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ContactModel } from '../../models/contact.model';
import { catchError, from, Observable, tap, throwError } from 'rxjs';
import axios, { AxiosInstance } from 'axios'
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private api: AxiosInstance;

  constructor() {
 this.api = axios.create({
  baseURL: environment.apiDomain,
  headers: { 'Content-Type': 'application/json' }
});
  }

  submitContactDetail(f: ContactModel): Observable<any> {

     const payload = {
    contact_id:   f.id,
    first_name:   f.firstName,
    email:        f.email,
    phone_number: f.phoneNumber,
    subject:      f.description,
    message:      f.message
  };
      console.log('🪂 Sending payload to API:', payload);

   return from(
    this.api
      .post('/Contact/AddContact', payload)
      .then(r => r.data)
  );
  }

  getAllContactDetails(): Observable<any[]> {
    return from(this.api.get('/Contact/GetAllContact')
      .then(resp => resp.data));
  }

  deleteContact(contactId: string): Observable<void> {
    return from(this.api.delete(`/Contact/deleteContact/${contactId}`)
      .then(() => {}));
  }

  generateRandomContactID(): string {
    const min = 100000, max = 999999;
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
  }

}
