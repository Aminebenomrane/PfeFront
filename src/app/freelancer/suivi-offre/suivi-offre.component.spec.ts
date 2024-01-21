import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviOffreComponent } from './suivi-offre.component';

describe('SuiviOffreComponent', () => {
  let component: SuiviOffreComponent;
  let fixture: ComponentFixture<SuiviOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
