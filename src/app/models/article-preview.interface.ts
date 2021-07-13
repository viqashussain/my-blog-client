import { Category } from './category.interface';
import { Tag } from './tag.interface';

export interface ArticlePreview
{
    id: number;
    creationDate: string;
    publishDate: string;
    title: string;
    urlTitle: string;
    pageNumber: number;
    previewText: string;
    previewImageFileName: string;
    thumbnailImageFileName: string;
    category: Category;
    tags: Tag[];
}