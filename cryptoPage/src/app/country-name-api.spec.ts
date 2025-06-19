import { TestBed } from '@angular/core/testing';

import { CountryNameApi } from './country-name-api';

describe('CountryNameApi', () => {
  let service: CountryNameApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryNameApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
