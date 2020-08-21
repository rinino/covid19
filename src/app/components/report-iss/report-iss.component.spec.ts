import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIssComponent } from './report-iss.component';

describe('ReportIssComponent', () => {
  let component: ReportIssComponent;
  let fixture: ComponentFixture<ReportIssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
