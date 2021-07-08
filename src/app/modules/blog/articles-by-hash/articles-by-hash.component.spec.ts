import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesByHashComponent } from './articles-by-hash.component';

describe('ArticlesByHashComponent', () => {
  let component: ArticlesByHashComponent;
  let fixture: ComponentFixture<ArticlesByHashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesByHashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesByHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
