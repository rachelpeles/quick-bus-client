import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPassengerDialogComponent } from './new-passenger-dialog.component';

describe('NewPassengerDialogComponent', () => {
  let component: NewPassengerDialogComponent;
  let fixture: ComponentFixture<NewPassengerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPassengerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPassengerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
