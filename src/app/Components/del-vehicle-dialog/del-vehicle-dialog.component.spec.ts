import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelVehicleDialogComponent } from './del-vehicle-dialog.component';

describe('DelVehicleDialogComponent', () => {
  let component: DelVehicleDialogComponent;
  let fixture: ComponentFixture<DelVehicleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelVehicleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
