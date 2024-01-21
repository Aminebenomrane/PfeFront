import { TestBed } from '@angular/core/testing';

import { DemandeOffreService } from './demande-offre.service';

describe('DemandeOffreService', () => {
  let service: DemandeOffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeOffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
