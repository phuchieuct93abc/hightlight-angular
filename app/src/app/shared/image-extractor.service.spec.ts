import { TestBed } from '@angular/core/testing';

import { ImageExtractorService } from './image-extractor.service';

describe('ImageExtractorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageExtractorService = TestBed.get(ImageExtractorService);
    expect(service).toBeTruthy();
  });
});
