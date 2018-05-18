import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorgraficoComponent } from './motorgrafico.component';

describe('MotorgraficoComponent', () => {
  let component: MotorgraficoComponent;
  let fixture: ComponentFixture<MotorgraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotorgraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorgraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
