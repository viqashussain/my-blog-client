import { Injectable } from '@angular/core';
import { AboutMeData } from '../models/about-me-data.interface';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }

  getAboutMeData(): Observable<AboutMeData> {
    return this.http.get<AboutMeData>(`${AppConfig.baseUrl}/AboutMe`);
  }
}
