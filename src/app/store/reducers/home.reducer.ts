import { Article } from 'src/app/models/article.interface';
import { HomeActions } from '../actions/home.actions';
import * as homeActions from '../actions/home.actions';
import { Tag } from 'src/app/models/tag.interface';
import { ArticlePreview } from 'src/app/models/article-preview.interface';
import { AboutMeData } from 'src/app/models/about-me-data.interface';

export interface HomeState {
    articlePreviews: ArticlePreview[];
    articlePreviewsByHash: ArticlePreview[];
    articlePreviewsByCat: ArticlePreview[];
    currentArticle: Article;
    tags: Tag[];
    aboutMeData: AboutMeData;
};

export const initialState: HomeState = {
    articlePreviews: [],
    articlePreviewsByHash: [],
    articlePreviewsByCat: [],
    currentArticle: null,
    tags: [],
    aboutMeData: null
};

export function reducer(state = initialState, action: HomeActions): HomeState {
    switch (action.type) {
        case homeActions.GET_ARTICLE_PREVIEWS_SUCCESS:
            {
                const newState = { ...state };
                newState.articlePreviews = action.payload;
                return newState;
            }
        case homeActions.GET_ARTICLE:
            {
                const newState = { ...state };
                newState.currentArticle = null;
                return newState;
            }
        case homeActions.GET_ARTICLE_SUCCESS:
            {
                const newState = { ...state };
                newState.currentArticle = action.payload;
                return newState;
            }
        case homeActions.GET_ARTICLES_BY_HASHTAG:
            {
                const newState = { ...state };
                newState.articlePreviewsByHash = [];
                return newState;
            }
        case homeActions.GET_ARTICLES_BY_HASHTAG_SUCCESS:
            {
                const newState = { ...state };
                newState.articlePreviewsByHash = action.payload;
                return newState;
            }
        case homeActions.GET_ARTICLES_BY_CATEGORY:
            {
                const newState = { ...state };
                newState.articlePreviewsByCat = [];
                return newState;
            }
        case homeActions.GET_ARTICLES_BY_CATEGORY_SUCCESS:
            {
                const newState = { ...state };
                newState.articlePreviewsByCat = action.payload;
                return newState;
            }
        case homeActions.GET_TAG_SUCCESS:
            {
                const newState = { ...state };
                newState.tags = [...newState.tags, action.payload];
                return newState;
            }
        case homeActions.GET_ABOUT_ME_SUCCESS:
            {
                const newState = { ...state };
                newState.aboutMeData = action.payload;
                return newState;
            }
        default: {
            return state;
        }
    }
}