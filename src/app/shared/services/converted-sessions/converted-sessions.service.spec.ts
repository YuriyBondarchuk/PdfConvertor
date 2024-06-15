import { TestBed } from '@angular/core/testing';

import { ConvertedSessionsService } from './converted-sessions.service';

describe('ConvertedSessionsService', () => {
  let service: ConvertedSessionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvertedSessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
