import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelTransDialogComponent } from './del-trans-dialog.component';

describe('DelTransDialogComponent', () => {
  let component: DelTransDialogComponent;
  let fixture: ComponentFixture<DelTransDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelTransDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelTransDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
