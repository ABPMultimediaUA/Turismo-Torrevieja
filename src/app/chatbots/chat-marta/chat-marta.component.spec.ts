import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMartaComponent } from './chat-marta.component';

describe('ChatMartaComponent', () => {
  let component: ChatMartaComponent;
  let fixture: ComponentFixture<ChatMartaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMartaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
