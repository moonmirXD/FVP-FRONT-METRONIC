import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealersUrlComponent } from './dealers-url.component';

describe('DealersUrlComponent', () => {
  let component: DealersUrlComponent;
  let fixture: ComponentFixture<DealersUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealersUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealersUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
