import { TestBed } from '@angular/core/testing';

import { ConvertorService } from './convertor.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ConvertorService', () => {
  let service: ConvertorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
		imports: [HttpClientTestingModule],
		providers: [ConvertorService]
	});
    service = TestBed.inject(ConvertorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
