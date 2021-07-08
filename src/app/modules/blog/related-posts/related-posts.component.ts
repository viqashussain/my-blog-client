import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ArticlePreview } from 'src/app/models/article-preview.interface';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Article } from 'src/app/models/article.interface';
import { GetArticlesByCategory, GET_ARTICLES_BY_CATEGORY_SUCCESS, GetArticlesByHashTag } from 'src/app/store/actions/home.actions';
import { takeUntil, map, distinct, filter } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-related-posts',
  templateUrl: './related-posts.component.html',
  styleUrls: ['./related-posts.component.scss']
})
export class RelatedPostsComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>, private actions$: Actions) { }

  articles$: Observable<ArticlePreview[]>;
  componentDestroyed$: Subject<boolean> = new Subject();

  @Input() relatedArticle: Observable<Article>;

  ngOnInit() {
    this.relatedArticle.pipe(
      takeUntil(this.componentDestroyed$)
    )
      .subscribe(article => {
        if (article) {
          this.store.dispatch(new GetArticlesByCategory(article.category.id))
          this.store.dispatch(new GetArticlesByHashTag(article.tags[0].id))
        }
      })

    this.articles$ = this.store.pipe(
      select(x => x.home.articlePreviewsByCat.concat(x.home.articlePreviewsByHash)),
      map(articles => {
        let uniqueArticles = articles.filter((thing, index, self) => self.findIndex(t => t.id === thing.id) === index);
        return uniqueArticles.slice(0,3);
      }),
    );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
