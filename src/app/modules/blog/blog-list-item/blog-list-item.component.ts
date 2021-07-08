import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article.interface';
import * as $ from 'jquery';
import { ArticlePreview } from 'src/app/models/article-preview.interface';
import { query, trigger, transition, style, animate, animateChild } from '@angular/animations';

@Component({
  selector: 'app-blog-list-item',
  templateUrl: './blog-list-item.component.html',
  styleUrls: ['./blog-list-item.component.scss'],
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
export class BlogListItemComponent implements OnInit {

  @Input() article: ArticlePreview;
  showPlaceholderGreyBackground: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  thumbnailLoaded() {
    this.showPlaceholderGreyBackground = false;
  }
}

function animate_blog() {

  var items = $('.blog-animated .blog-stream .hentry');
  var items_in_viewport = $('.blog-animated .blog-stream .hentry:in-viewport');
  var effect = $('html').data('effect');
  items.addClass('animated out');
  items_in_viewport.removeClass('animated out');

  items.each(function (index, element) {
    var el = $(element);
    el.waypoint(function () {

      el.addClass(effect).removeClass('out');

    }, { offset: '75%' });
  });

}
