import { TestBed } from '@angular/core/testing';

import { ApicardsService } from './apicards.service';

describe('ApicardsService', () => {
  let service: ApicardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApicardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
