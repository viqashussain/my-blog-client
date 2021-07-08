import { Category } from './category.interface';
import { Tag } from './tag.interface';

export interface Article
{
    id: number;
    creationDate: string;
    publishDate: string;
    title: string;
    html: string;
    articleImageFileName: string;
    category: Category
    tags: Tag[]
}