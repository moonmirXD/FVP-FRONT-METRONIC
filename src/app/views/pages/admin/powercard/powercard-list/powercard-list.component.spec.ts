import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowercardListComponent } from './powercard-list.component';

describe('PowercardListComponent', () => {
  let component: PowercardListComponent;
  let fixture: ComponentFixture<PowercardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowercardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowercardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
