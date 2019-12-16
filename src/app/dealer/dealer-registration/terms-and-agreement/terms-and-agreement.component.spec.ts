import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsAndAgreementComponent } from './terms-and-agreement.component';

describe('TermsAndAgreementComponent', () => {
  let component: TermsAndAgreementComponent;
  let fixture: ComponentFixture<TermsAndAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsAndAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsAndAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
