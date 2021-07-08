import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject, combineLatest, timer } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { GetArticlePreviews } from 'src/app/store/actions/home.actions';
import { ArticlePreview } from 'src/app/models/article-preview.interface';
import { delay, takeUntil, map, tap, filter } from 'rxjs/operators';
import { trigger, transition, style, animate, query, animateChild } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  articles$: Observable<ArticlePreview[]>;
  showArticles$: Observable<boolean>;
  numberOfPlaceholderItems: number[] = [1, 2, 3];
  haveArticlesAtBeginning: boolean = true;
  componentDestroyed$: Subject<boolean> = new Subject();

  pageNumbers: number[];
  currentPageNumber$: BehaviorSubject<number> = new BehaviorSubject(1);

  showGoToFirstPage$: Observable<boolean>;
  showGoToLastPage$: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    const articlePreviews = this.store.pipe(
      select(x => x.home.articlePreviews),
      map(articlePreviews => {
        return articlePreviews.sort((a, b) => {
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        })
      })
    );

    this.articles$ = combineLatest(articlePreviews, this.currentPageNumber$).pipe(
      filter((obj: any[]) => obj[0].length > 0),
      map((obj: any[]) => {
        const articlesForPage = obj[0].filter(x => x.pageNumber === obj[1]);
        if (!articlesForPage.length) {
          this.currentPageNumber$.next(1);
          this.location.go(this.currentPageNumber$.getValue().toString());
          return [];
        }
        return articlesForPage;
      }));

    this.store.pipe(
      select(x => x.home.articlePreviews),
      takeUntil(this.componentDestroyed$),
      map((articles: ArticlePreview[]) => {
        const allPageNumbers = articles.map(x => x.pageNumber);
        const distinctPageNumbers = allPageNumbers.filter((v, i, a) => a.indexOf(v) === i);
        const sortedPageNumbers = distinctPageNumbers.sort((a, b) => {
          return a - b;
        });
        this.pageNumbers = sortedPageNumbers;
      })).subscribe();

    this.route.params.pipe(
      takeUntil(this.componentDestroyed$),
      tap((params) => {
        const pageNumber = params['pageNumber'];
        if (!isNaN(parseInt(pageNumber)))
          this.currentPageNumber$.next(parseInt(pageNumber));
        else
          this.location.go('home/' + this.currentPageNumber$.getValue().toString());
      }))
      .subscribe();

    this.showGoToFirstPage$ = this.currentPageNumber$.pipe(map(x => {
      return x !== 1;
    }));

    this.showGoToLastPage$ = this.currentPageNumber$.pipe(map(x => {
      const maxPageNumber = Math.max.apply(Math, this.pageNumbers);
      return x !== maxPageNumber;
    }));

    this.store.pipe(
      select((x: AppState) => x.home.articlePreviews),
      takeUntil(this.componentDestroyed$),
      map((x: ArticlePreview[]) => {
        this.haveArticlesAtBeginning = x.length > 0;
      })).subscribe();

    if (this.haveArticlesAtBeginning) {
      this.showArticles$ = of(true);
    }
    else {
      this.store.dispatch(new GetArticlePreviews());
      this.showArticles$ = this.store.pipe(
        select((state: AppState) => state.home.articlePreviews.length > 0),
        delay(450)
      );
    }
  }

  goToPage(pageNumber: number) {
    this.currentPageNumber$.next(pageNumber);
    this.afterPageChange();
  }

  goToPrevPage() {
    this.currentPageNumber$.next(this.currentPageNumber$.getValue() - 1);
    this.afterPageChange();
  }

  goToNextPage() {
    this.currentPageNumber$.next(this.currentPageNumber$.getValue() + 1);
    this.afterPageChange();
  }

  goToFirstPage() {
    this.currentPageNumber$.next(1);
    this.afterPageChange();
  }

  goToLastPage() {
    this.currentPageNumber$.next(Math.max.apply(Math, this.pageNumbers));
    this.afterPageChange();
  }

  afterPageChange() {
    this.location.go(this.currentPageNumber$.getValue().toString());
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }
}

