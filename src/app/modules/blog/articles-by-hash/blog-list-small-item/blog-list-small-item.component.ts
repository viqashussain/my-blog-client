import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article.interface';
import { trigger, transition, style, animate, query, animateChild } from '@angular/animations';

@Component({
  selector: 'app-blog-list-small-item',
  templateUrl: './blog-list-small-item.component.html',
  styleUrls: ['./blog-list-small-item.component.scss'],
  animations: [
    trigger('show', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
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
export class BlogListSmallItemComponent implements OnInit {

  constructor() { }

  @Input() article: Article;

  ngOnInit() {
  }

}
