import { Action } from '@ngrx/store';
import { Article } from 'src/app/models/article.interface';
import { Tag } from 'src/app/models/tag.interface';
import { ArticlePreview } from 'src/app/models/article-preview.interface';
import { AboutMeData } from 'src/app/models/about-me-data.interface';

export const GET_ARTICLE_PREVIEWS = '[Home] Get Article Previews';
export const GET_ARTICLE_PREVIEWS_SUCCESS = '[Home] Get Article Previews Success';
export const GET_ARTICLE = '[Home] Get Article';
export const GET_ARTICLE_SUCCESS = '[Home] Get Article Success';

export const GET_ABOUT_ME = '[Home] Get About Me';
export const GET_ABOUT_ME_SUCCESS = '[Home] Get About Me Success';

export const GET_ARTICLES_BY_HASHTAG = '[Home] Get Articles By HashTag';
export const GET_ARTICLES_BY_HASHTAG_SUCCESS = '[Home] Get Articles By HashTag Success';

export const GET_ARTICLES_BY_CATEGORY = '[Home] Get Articles By Category';
export const GET_ARTICLES_BY_CATEGORY_SUCCESS = '[Home] Get Articles By Category Success';

export const GET_TAG = '[Home] Get Tag';
export const GET_TAG_SUCCESS = '[Home] Get Tag Success';

export class GetAboutMe implements Action {
    readonly type = GET_ABOUT_ME;

    constructor() { }
}

export class GetAboutMeSuccess implements Action {
    readonly type = GET_ABOUT_ME_SUCCESS;

    constructor(public payload: AboutMeData) { }
}

export class GetArticlePreviews implements Action {
    readonly type = GET_ARTICLE_PREVIEWS;

    constructor() { }
}

export class GetArticlePreviewsSuccess implements Action {
    readonly type = GET_ARTICLE_PREVIEWS_SUCCESS;

    constructor(public payload: ArticlePreview[]) { }
}

export class GetArticle implements Action {
    readonly type = GET_ARTICLE;

    constructor(public payload: number) { }
}

export class GetArticleSuccess implements Action {
    readonly type = GET_ARTICLE_SUCCESS;

    constructor(public payload: Article) { }
}

export class GetArticlesByHashTag implements Action {
    readonly type = GET_ARTICLES_BY_HASHTAG;

    constructor(public payload: number) { }
}

export class GetArticlesByHashTagSuccess implements Action {
    readonly type = GET_ARTICLES_BY_HASHTAG_SUCCESS;

    constructor(public payload: ArticlePreview[]) { }
}

export class GetArticlesByCategory implements Action {
    readonly type = GET_ARTICLES_BY_CATEGORY;

    constructor(public payload: number) { }
}

export class GetArticlesByCategorySuccess implements Action {
    readonly type = GET_ARTICLES_BY_CATEGORY_SUCCESS;

    constructor(public payload: ArticlePreview[]) { }
}

export class GetTag implements Action {
    readonly type = GET_TAG;

    constructor(public payload: number) { }
}

export class GetTagSuccess implements Action {
    readonly type = GET_TAG_SUCCESS;

    constructor(public payload: Tag) { }
}

export type HomeActions
    = GetArticlePreviews
    | GetAboutMe
    | GetAboutMeSuccess
    | GetArticlesByCategory
    | GetArticlesByCategorySuccess
    | GetTag
    | GetTagSuccess
    | GetArticlesByHashTag
    | GetArticlesByHashTagSuccess
    | GetArticleSuccess
    | GetArticle
    | GetArticlePreviewsSuccess;