import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFComponent } from './chat-f.component';

describe('ChatFComponent', () => {
  let component: ChatFComponent;
  let fixture: ComponentFixture<ChatFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
