import { TestBed, async, inject } from '@angular/core/testing';

import { AuthdealerGuard } from './authdealer.guard';

describe('AuthdealerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthdealerGuard]
    });
  });

  it('should ...', inject([AuthdealerGuard], (guard: AuthdealerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
