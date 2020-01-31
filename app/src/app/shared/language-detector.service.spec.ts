import { TestBed } from '@angular/core/testing';

import { LanguageDetectorService } from './language-detector.service';

describe('LanguageDetectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguageDetectorService = TestBed.get(LanguageDetectorService);
    expect(service).toBeTruthy();
  });
});
