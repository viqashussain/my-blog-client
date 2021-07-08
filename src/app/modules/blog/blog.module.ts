import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { HomeComponent } from './home/home.component';
import { BlogListItemComponent } from './blog-list-item/blog-list-item.component';
import { HomeTitleComponent } from './home/home-title/home-title.component';
import { ArticleComponent } from './article/article.component';
import { PrismModule } from '@ngx-prism/core';
import { HeaderComponent } from './home/header/header.component';
import { BlogLayoutComponent } from './blog-layout/blog-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DisqusModule } from 'ngx-disqus';
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';
import { ArticlesByHashComponent } from './articles-by-hash/articles-by-hash.component';
import { BlogListSmallItemComponent } from './articles-by-hash/blog-list-small-item/blog-list-small-item.component';
import { ArticlesByCatComponent } from './articles-by-cat/articles-by-cat.component';
import { RelatedPostsComponent } from './related-posts/related-posts.component';
import { NgxProgressiveImgLoaderModule } from 'ngx-progressive-img-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from 'src/app/footer/footer.component';
import { SafePipe } from 'src/app/safe.pipe';
import { SafeStylePipe } from 'src/app/safe-style.pipe';
import { AboutMeComponent } from './about-me/about-me.component';

@NgModule({
  declarations: [
    HomeComponent,
    BlogListItemComponent,
    HomeTitleComponent,
    ArticleComponent,
    HeaderComponent,
    BlogLayoutComponent,
    ArticlesByHashComponent,
    BlogListSmallItemComponent,
    ArticlesByCatComponent, 
    FooterComponent,
    SafePipe,
    SafeStylePipe,
    RelatedPostsComponent,
    AboutMeComponent
  ],
  imports: [
    PrismModule,
    CommonModule,
    BlogRoutingModule,
    FontAwesomeModule,
    DisqusModule,
    HighlightJsModule,
    NgxProgressiveImgLoaderModule
  ],
  providers: [HighlightJsService]
})
export class BlogModule { }
