import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCreateTransportationComponent } from './my-create-transportation.component';

describe('MyCreateTransportationComponent', () => {
  let component: MyCreateTransportationComponent;
  let fixture: ComponentFixture<MyCreateTransportationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCreateTransportationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCreateTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
