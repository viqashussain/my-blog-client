import { TestBed } from '@angular/core/testing';

import { ArticlePreviewService } from './article-preview.service';

describe('ArticlePreviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticlePreviewService = TestBed.get(ArticlePreviewService);
    expect(service).toBeTruthy();
  });
});
