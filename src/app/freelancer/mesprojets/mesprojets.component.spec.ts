import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesprojetsComponent } from './mesprojets.component';

describe('MesprojetsComponent', () => {
  let component: MesprojetsComponent;
  let fixture: ComponentFixture<MesprojetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesprojetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesprojetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
