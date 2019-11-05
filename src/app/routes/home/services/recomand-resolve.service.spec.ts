import { TestBed } from '@angular/core/testing';

import { RecomandResolveService } from './recomand-resolve.service';

describe('HomeResolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecomandResolveService = TestBed.get(RecomandResolveService);
    expect(service).toBeTruthy();
  });
});
