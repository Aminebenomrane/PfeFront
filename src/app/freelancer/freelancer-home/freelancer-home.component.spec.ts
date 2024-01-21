import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerHomeComponent } from './freelancer-home.component';

describe('FreelancerHomeComponent', () => {
  let component: FreelancerHomeComponent;
  let fixture: ComponentFixture<FreelancerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
