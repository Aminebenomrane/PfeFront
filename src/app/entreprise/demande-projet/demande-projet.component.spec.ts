import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeProjetComponent } from './demande-projet.component';

describe('DemandeProjetComponent', () => {
  let component: DemandeProjetComponent;
  let fixture: ComponentFixture<DemandeProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
