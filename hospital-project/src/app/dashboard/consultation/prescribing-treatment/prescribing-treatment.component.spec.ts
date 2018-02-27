import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescribingTreatmentComponent } from './prescribing-treatment.component';

describe('PrescribingTreatmentComponent', () => {
  let component: PrescribingTreatmentComponent;
  let fixture: ComponentFixture<PrescribingTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescribingTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescribingTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
