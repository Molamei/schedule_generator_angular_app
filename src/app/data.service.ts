import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  post(url: string, body: { addedCourses: any[]; }) {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) { }

  getApiData(apiUrl: string): Observable<any> {
    return this.http.get(apiUrl);
  }

  postApiData(apiUrl: string, data: any): Observable<any> {
    return this.http.post(apiUrl, data);
  }
}
