import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { BlogLayoutComponent } from './blog-layout/blog-layout.component';
import { ArticlesByHashComponent } from './articles-by-hash/articles-by-hash.component';
import { ArticlesByCatComponent } from './articles-by-cat/articles-by-cat.component';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
  {
    path: '',
    component: BlogLayoutComponent,
    children: [
      {
        path: 'home/:pageNumber',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'home/article/:id',
        component: ArticleComponent
      },
      {
        path: 'home/articles-by-hashtag/:id',
        component: ArticlesByHashComponent
      },
      {
        path: 'home/articles-by-category/:id',
        component: ArticlesByCatComponent
      },
      {
        path: 'about-me',
        component: AboutMeComponent
      },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
