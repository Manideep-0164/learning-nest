import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { intructorAuthGuard } from './intructor-auth.guard';

describe('intructorAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => intructorAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
