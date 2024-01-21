import { TestBed } from '@angular/core/testing';

import { DemandeProjetService } from './demande-projet.service';

describe('DemandeProjetService', () => {
  let service: DemandeProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
