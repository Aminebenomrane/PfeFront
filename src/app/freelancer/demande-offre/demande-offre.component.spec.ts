import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeOffreComponent } from './demande-offre.component';

describe('DemandeOffreComponent', () => {
  let component: DemandeOffreComponent;
  let fixture: ComponentFixture<DemandeOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
