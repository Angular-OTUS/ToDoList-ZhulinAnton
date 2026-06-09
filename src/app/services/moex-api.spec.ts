import { TestBed } from '@angular/core/testing';

import { MoexApi } from './moex-api';

describe('MoexApi', () => {
  let service: MoexApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoexApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
