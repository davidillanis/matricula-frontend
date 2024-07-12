import { TestBed } from '@angular/core/testing';

import { AlertEntityService } from './alert-entity.service';

describe('AlertEntityService', () => {
  let service: AlertEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
