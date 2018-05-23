import { TestBed, inject } from '@angular/core/testing';

import { DifusionWpService } from './difusion-wp.service';

describe('DifusionWpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DifusionWpService]
    });
  });

  it('should be created', inject([DifusionWpService], (service: DifusionWpService) => {
    expect(service).toBeTruthy();
  }));
});
