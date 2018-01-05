import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCarlosComponent } from './chat-carlos.component';

describe('ChatCarlosComponent', () => {
  let component: ChatCarlosComponent;
  let fixture: ComponentFixture<ChatCarlosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCarlosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCarlosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
