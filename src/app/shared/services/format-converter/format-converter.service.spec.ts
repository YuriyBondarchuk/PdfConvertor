import { TestBed } from '@angular/core/testing';

import { FormatConverterService } from './format-converter.service';

describe('FormatConverterService', () => {
  let service: FormatConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
