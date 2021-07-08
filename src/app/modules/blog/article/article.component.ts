import { Component, OnInit, OnDestroy, ElementRef, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.interface';
import { take, tap, map, takeUntil, delay } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { GetArticle, GetArticleSuccess } from 'src/app/store/actions/home.actions';
import { faTwitter, faGooglePlusG, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { AppConfig } from 'src/app/app.config';
import { HighlightJsService } from 'angular2-highlight-js';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, state, transition, trigger, style, keyframes, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ])
    ]),
    trigger('hide', [
      transition('* => void', [
        style({ opacity: 1 }),
        animate(500, style({ opacity: 0 }))
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
export class ArticleComponent implements OnInit, OnDestroy, AfterViewChecked {

  faTwitter = faTwitter;
  faGooglePlus = faGooglePlusG;
  faFacebook = faFacebookF;

  appUrl: string = AppConfig.baseUrl;
  componentDestroyed$: Subject<boolean> = new Subject();
  article$: Observable<Article>;
  showArticle$: Observable<boolean>;
  showArticleNew$: Observable<boolean>;
  haveArticleAtBeginning: boolean = true;
  articleImageFileName: string;

  constructor(private route: ActivatedRoute, private store: Store<AppState>, private el: ElementRef, private service: HighlightJsService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.article$ = this.store.pipe(
      select((state: AppState) => state.home.currentArticle),
    );

    this.article$.pipe(
      takeUntil(this.componentDestroyed$),
      map((x: Article) => {
        this.haveArticleAtBeginning = x !== null;
      })).subscribe();

    if (this.haveArticleAtBeginning) {
      this.showArticle$ = of(true);
    }
    else {
      this.showArticle$ = this.store.pipe(
        select((state: AppState) => state.home.currentArticle !== null),
        delay(450)
      );
    }
    
    this.store.pipe(
      select((state: AppState) => state.home.currentArticle),
      (takeUntil(this.componentDestroyed$)))
      .subscribe(x => {
        if (x) {
          this.articleImageFileName = x.articleImageFileName;
        }
      });

    this.route.params.pipe(
      takeUntil(this.componentDestroyed$),
      tap((params) => {
        const articleId = params['id'];
        this.store.dispatch(new GetArticle(articleId));
      }))
      .subscribe();
  }

  ngAfterViewChecked(): void {
    const allCodeElements = this.el.nativeElement.querySelectorAll('code');
    if (allCodeElements) {
      allCodeElements.forEach(element => {
        this.service.highlight(element);
      });
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new GetArticleSuccess(null));
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

