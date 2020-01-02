import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineStoreUpdateComponent } from './online-store-update.component';

describe('OnlineStoreUpdateComponent', () => {
  let component: OnlineStoreUpdateComponent;
  let fixture: ComponentFixture<OnlineStoreUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineStoreUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStoreUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
