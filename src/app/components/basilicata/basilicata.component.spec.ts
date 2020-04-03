import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasilicataComponent } from './basilicata.component';

describe('BasilicataComponent', () => {
  let component: BasilicataComponent;
  let fixture: ComponentFixture<BasilicataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasilicataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasilicataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
