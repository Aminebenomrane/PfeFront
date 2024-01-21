import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOffreComponent } from './add-edit-offre.component';

describe('AddEditOffreComponent', () => {
  let component: AddEditOffreComponent;
  let fixture: ComponentFixture<AddEditOffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOffreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditOffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
