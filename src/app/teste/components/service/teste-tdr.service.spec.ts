import { TestBed } from '@angular/core/testing';

import { TesteTdrService } from './teste-tdr.service';

describe('TesteTdrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TesteTdrService = TestBed.get(TesteTdrService);
    expect(service).toBeTruthy();
  });
});
