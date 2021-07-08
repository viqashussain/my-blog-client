import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article.interface';
import { Tag } from 'src/app/models/tag.interface';
import { take, tap, map, delay } from 'rxjs/operators';
import { GetArticlesByCategory } from 'src/app/store/actions/home.actions';
import { ArticlePreview } from 'src/app/models/article-preview.interface';
import { trigger, transition, style, animate, animateChild, query } from '@angular/animations';

@Component({
  selector: 'app-articles-by-cat',
  templateUrl: './articles-by-cat.component.html',
  styleUrls: ['./articles-by-cat.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ])
    ]),
    trigger('hide', [
      transition('* => void', [
        style({ opacity: 1 }),
        animate(1000, style({ opacity: 0 }))
      ])
    ]),
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ]),
    trigger('hide', [
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ArticlesByCatComponent implements OnInit {

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  categoryId: number;
  articles$: Observable<ArticlePreview[]>;
  showArticles$: Observable<boolean>;
  category$: Observable<Tag>;

  numberOfPlaceholderItems: number[] = [1,2,3];

  ngOnInit() {
    this.route.params.pipe(
      take(1),
      tap((params) => {
        this.categoryId = params['id'];
        this.store.dispatch(new GetArticlesByCategory(this.categoryId));
      }))
      .subscribe();

    this.articles$ = this.store.pipe(
      select((state: AppState) => state.home.articlePreviewsByCat)
    );
    
    this.showArticles$ = this.store.pipe(
      select((state: AppState) => state.home.articlePreviewsByCat.length > 0),
      delay(450)
    );

    this.category$ = this.articles$.pipe(
      map((articles: ArticlePreview[]) => {
        if (articles.length) {
          return articles[0].category;
        }
      })
    )
  }
}
