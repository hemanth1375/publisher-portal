import { TestBed } from '@angular/core/testing';

import { ViewapiPageService } from './viewapi-page.service';

describe('ViewapiPageService', () => {
  let service: ViewapiPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewapiPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
