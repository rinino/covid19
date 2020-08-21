import { TestBed } from '@angular/core/testing';

import { RapportiIssService } from './rapporti-iss.service';

describe('RapportiIssService', () => {
  let service: RapportiIssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapportiIssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
