import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProjetComponent } from './add-edit-projet.component';

describe('AddEditProjetComponent', () => {
  let component: AddEditProjetComponent;
  let fixture: ComponentFixture<AddEditProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
