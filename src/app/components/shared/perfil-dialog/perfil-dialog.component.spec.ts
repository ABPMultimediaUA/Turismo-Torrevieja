import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDialogComponent } from './perfil-dialog.component';

describe('PerfilDialogComponent', () => {
  let component: PerfilDialogComponent;
  let fixture: ComponentFixture<PerfilDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
