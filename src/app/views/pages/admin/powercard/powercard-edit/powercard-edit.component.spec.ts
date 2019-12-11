import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowercardEditComponent } from './powercard-edit.component';

describe('PowercardEditComponent', () => {
  let component: PowercardEditComponent;
  let fixture: ComponentFixture<PowercardEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowercardEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowercardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
