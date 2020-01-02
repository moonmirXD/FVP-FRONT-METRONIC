import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStoreViewComponent } from './online-store-view.component';

describe('OnlineStoreViewComponent', () => {
  let component: OnlineStoreViewComponent;
  let fixture: ComponentFixture<OnlineStoreViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStoreViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStoreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
