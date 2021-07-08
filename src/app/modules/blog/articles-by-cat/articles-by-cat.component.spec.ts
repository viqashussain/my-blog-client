import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesByCatComponent } from './articles-by-cat.component';

describe('ArticlesByCatComponent', () => {
  let component: ArticlesByCatComponent;
  let fixture: ComponentFixture<ArticlesByCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesByCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesByCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
