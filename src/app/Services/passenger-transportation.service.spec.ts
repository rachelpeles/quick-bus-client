import { TestBed } from '@angular/core/testing';

import { PassengerTransportationService } from './passenger-transportation.service';

describe('PassengerTransportationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PassengerTransportationService = TestBed.get(PassengerTransportationService);
    expect(service).toBeTruthy();
  });
});
