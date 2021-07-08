import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { take, tap, map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GetArticlesByHashTag, GetTag } from 'src/app/store/actions/home.actions';
import { Tag } from 'src/app/models/tag.interface';
import { ArticlePreview } from 'src/app/models/article-preview.interface';
import { trigger, transition, style, animate, animateChild, query } from '@angular/animations';

@Component({
  selector: 'app-articles-by-hash',
  templateUrl: './articles-by-hash.component.html',
  styleUrls: ['./articles-by-hash.component.scss'],animations: [
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
export class ArticlesByHashComponent implements OnInit {

  constructor(private route: ActivatedRoute, private store: Store<AppState>) { }

  tagId: number;
  articles$: Observable<ArticlePreview[]>;
  showArticles$: Observable<boolean>;
  tag$: Observable<Tag>;

  numberOfPlaceholderItems: number[] = [1,2,3];

  ngOnInit() {
    this.route.params.pipe(
      take(1),
      tap((params) => {
        this.tagId = params['id'];
        this.store.dispatch(new GetArticlesByHashTag(this.tagId));
        this.store.dispatch(new GetTag(this.tagId));
      }))
      .subscribe();

      this.showArticles$ = this.store.pipe(
        select((state: AppState) => state.home.articlePreviewsByHash.length > 0),
        delay(450)
      );

    this.articles$ = this.store.pipe(
      select((state: AppState) => state.home.articlePreviewsByHash)
    );

    this.tag$ = this.store.pipe(
      select((state: AppState) => state.home.tags),
      map(tags => tags.find(x => x.id == this.tagId))
    );
  }

}
