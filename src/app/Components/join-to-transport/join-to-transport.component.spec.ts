import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinToTransportComponent } from './join-to-transport.component';

describe('JoinToTransportComponent', () => {
  let component: JoinToTransportComponent;
  let fixture: ComponentFixture<JoinToTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinToTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinToTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
