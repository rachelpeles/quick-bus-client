import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAndCalcComponent } from './show-and-calc.component';

describe('ShowAndCalcComponent', () => {
  let component: ShowAndCalcComponent;
  let fixture: ComponentFixture<ShowAndCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAndCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAndCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
