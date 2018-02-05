import { TestBed, async, inject } from '@angular/core/testing';

import { GotUserInfoGuard } from './got-user-info.guard';

describe('GotUserInfoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GotUserInfoGuard]
    });
  });

  it('should ...', inject([GotUserInfoGuard], (guard: GotUserInfoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
