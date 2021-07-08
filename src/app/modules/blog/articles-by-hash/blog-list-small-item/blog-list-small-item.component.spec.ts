import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListSmallItemComponent } from './blog-list-small-item.component';

describe('BlogListSmallItemComponent', () => {
  let component: BlogListSmallItemComponent;
  let fixture: ComponentFixture<BlogListSmallItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogListSmallItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogListSmallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
