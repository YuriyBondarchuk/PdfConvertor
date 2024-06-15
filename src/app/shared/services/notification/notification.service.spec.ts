import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {ToastrService} from "ngx-toastr";
import {provideLocationMocks} from "@angular/common/testing";

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
		providers: [
			ToastrService,
			{ provide: ToastrService, useValue: provideLocationMocks() }
		],
	});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
