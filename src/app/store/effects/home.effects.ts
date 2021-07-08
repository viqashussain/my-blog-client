import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { GET_ARTICLE, GET_ARTICLE_SUCCESS, GET_ARTICLES_BY_HASHTAG_SUCCESS, GET_ARTICLES_BY_HASHTAG, GET_TAG, GET_TAG_SUCCESS, GET_ARTICLES_BY_CATEGORY, GET_ARTICLES_BY_CATEGORY_SUCCESS, GET_ARTICLE_PREVIEWS_SUCCESS, GET_ARTICLE_PREVIEWS, GET_ABOUT_ME, GET_ABOUT_ME_SUCCESS, GetArticle } from '../actions/home.actions';
import { Article } from 'src/app/models/article.interface';
import { mergeMap, map, catchError, withLatestFrom, switchMap } from 'rxjs/operators'
import { empty, of, Observable } from 'rxjs';
import { Tag } from 'src/app/models/tag.interface';
import { TagService } from 'src/app/services/tag.service';
import { ArticlePreviewService } from 'src/app/services/article-preview.service';
import { ArticlePreview } from 'src/app/models/article-preview.interface';
import { AboutMeData } from 'src/app/models/about-me-data.interface';
import { AboutService } from 'src/app/services/about.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';


@Injectable()
export class HomeEffects {
    constructor(
        private actions$: Actions,
        private articleService: ArticleService,
        private articlePreviewService: ArticlePreviewService,
        private tagService: TagService,
        private aboutService: AboutService,
        private store: Store<AppState>
    ) { }

    @Effect()
    getArticles$ = this.actions$
        .pipe(
            ofType(GET_ARTICLE_PREVIEWS),
            mergeMap(() => this.articlePreviewService.getArticles()
                .pipe(
                    map((articles: ArticlePreview[]) => ({ type: GET_ARTICLE_PREVIEWS_SUCCESS, payload: articles })),
                    catchError((e) => empty())
                ))
        );

    @Effect()
    getTags$ = this.actions$
        .pipe(
            ofType(GET_TAG),
            mergeMap((action: any) => this.tagService.getTag(action.payload)
                .pipe(
                    map((tag: Tag) => ({ type: GET_TAG_SUCCESS, payload: tag })),
                    catchError((e) => empty())
                ))
        );

    @Effect()
    getArticle$ = this.actions$
        .pipe(
            ofType(GET_ARTICLE),
            withLatestFrom(this.store.pipe(select((x: AppState) => x.home.currentArticle))),
            map(([action, articlePreviews]) => [action, articlePreviews]),
            mergeMap((obj: any) => {
                const articleId = obj[0].payload;
                const haveArticle = obj[1] !== null && obj[1].id == articleId;
                if (haveArticle) {
                    return empty();
                }
                else {
                    return this.articleService.getArticle(obj[0].payload).pipe(
                        map((article: Article) => ({ type: GET_ARTICLE_SUCCESS, payload: article })),
                        catchError((e) => empty())
                    )
                }
            })
        );

    @Effect()
    getArticleByHashTag$ = this.actions$
        .pipe(
            ofType(GET_ARTICLES_BY_HASHTAG),
            mergeMap((action: any) => this.articlePreviewService.getArticlesByHashTag(action.payload)
                .pipe(
                    map((articles: ArticlePreview[]) => ({ type: GET_ARTICLES_BY_HASHTAG_SUCCESS, payload: articles })),
                    catchError((e) => empty())
                ))
        );

    @Effect()
    getArticleByCategory$ = this.actions$
        .pipe(
            ofType(GET_ARTICLES_BY_CATEGORY),
            mergeMap((action: any) => this.articlePreviewService.getArticlesByCategory(action.payload)
                .pipe(
                    map((articles: ArticlePreview[]) => ({ type: GET_ARTICLES_BY_CATEGORY_SUCCESS, payload: articles })),
                    catchError((e) => empty())
                ))
        );

    @Effect()
    getAboutMe$ = this.actions$
        .pipe(
            ofType(GET_ABOUT_ME),
            mergeMap(() => this.aboutService.getAboutMeData()
                .pipe(
                    map((aboutMeData: AboutMeData) => ({ type: GET_ABOUT_ME_SUCCESS, payload: aboutMeData })),
                    catchError((e) => empty())
                ))
        );
} 