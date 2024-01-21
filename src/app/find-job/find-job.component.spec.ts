import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindJobComponent } from './find-job.component';

describe('FindJobComponent', () => {
  let component: FindJobComponent;
  let fixture: ComponentFixture<FindJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
