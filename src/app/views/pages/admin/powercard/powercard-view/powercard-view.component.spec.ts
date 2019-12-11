import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowercardViewComponent } from './powercard-view.component';

describe('PowercardViewComponent', () => {
  let component: PowercardViewComponent;
  let fixture: ComponentFixture<PowercardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowercardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowercardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
