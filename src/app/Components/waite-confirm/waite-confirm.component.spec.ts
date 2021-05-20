import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiteConfirmComponent } from './waite-confirm.component';

describe('WaiteConfirmComponent', () => {
  let component: WaiteConfirmComponent;
  let fixture: ComponentFixture<WaiteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
