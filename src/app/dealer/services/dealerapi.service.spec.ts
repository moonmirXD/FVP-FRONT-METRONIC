import { TestBed } from '@angular/core/testing';

import { DealerapiService } from './dealerapi.service';

describe('DealerapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealerapiService = TestBed.get(DealerapiService);
    expect(service).toBeTruthy();
  });
});
