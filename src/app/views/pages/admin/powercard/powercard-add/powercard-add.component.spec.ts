import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowercardAddComponent } from './powercard-add.component';

describe('PowercardAddComponent', () => {
  let component: PowercardAddComponent;
  let fixture: ComponentFixture<PowercardAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowercardAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowercardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
