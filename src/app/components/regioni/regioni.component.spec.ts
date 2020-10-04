import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegioniComponent } from './regioni.component';

describe('RegioniComponent', () => {
  let component: RegioniComponent;
  let fixture: ComponentFixture<RegioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
