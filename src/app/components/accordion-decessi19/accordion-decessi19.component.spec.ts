import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionDecessi19Component } from './accordion-decessi19.component';

describe('AccordionDecessi19Component', () => {
  let component: AccordionDecessi19Component;
  let fixture: ComponentFixture<AccordionDecessi19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionDecessi19Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionDecessi19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
