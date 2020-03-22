import { TestBed } from '@angular/core/testing';

import { RecuperoJsonService } from './recupero-json.service';

describe('RecuperoJsonService', () => {
  let service: RecuperoJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperoJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
