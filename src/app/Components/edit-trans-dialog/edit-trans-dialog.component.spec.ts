import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTransDialogComponent } from './edit-trans-dialog.component';

describe('EditTransDialogComponent', () => {
  let component: EditTransDialogComponent;
  let fixture: ComponentFixture<EditTransDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
