import { TestBed, inject } from '@angular/core/testing';

import { ExpedienteService } from './expediente.service';

describe('ExpedienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpedienteService]
    });
  });

  it('should be created', inject([ExpedienteService], (service: ExpedienteService) => {
    expect(service).toBeTruthy();
  }));
});
