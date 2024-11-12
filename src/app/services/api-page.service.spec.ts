import { TestBed } from '@angular/core/testing';

import { ApiPageService } from './api-page.service';

describe('ApiPageService', () => {
  let service: ApiPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
