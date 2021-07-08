import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.interface';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTag(tagId: number): Observable<Tag> {
    return this.http.get<Tag>(`${AppConfig.baseUrl}/Tag/${tagId}`);
  }
}
