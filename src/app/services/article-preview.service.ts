import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.interface';
import { AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { ArticlePreview } from '../models/article-preview.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlePreviewService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<ArticlePreview[]> {
    return this.http.get<ArticlePreview[]>(`${AppConfig.baseUrl}/ArticlePreview`);
  }

  getArticlesByHashTag(tagId: number): Observable<ArticlePreview[]> {
    return this.http.get<ArticlePreview[]>(`${AppConfig.baseUrl}/ArticlePreview/GetByHashTag/${tagId}`);
  }

  getArticlesByCategory(catId: number): Observable<ArticlePreview[]> {
    return this.http.get<ArticlePreview[]>(`${AppConfig.baseUrl}/ArticlePreview/GetByCategory/${catId}`);
  }
}
