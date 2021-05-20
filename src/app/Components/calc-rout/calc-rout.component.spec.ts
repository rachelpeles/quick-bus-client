import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcRoutComponent } from './calc-rout.component';

describe('CalcRoutComponent', () => {
  let component: CalcRoutComponent;
  let fixture: ComponentFixture<CalcRoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalcRoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcRoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
