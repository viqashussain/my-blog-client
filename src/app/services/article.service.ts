import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { Article } from '../models/article.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticle(articleId: number): Observable<Article> {
    return this.http.get<Article>(`${AppConfig.baseUrl}/Article/${articleId}`);
  }
}