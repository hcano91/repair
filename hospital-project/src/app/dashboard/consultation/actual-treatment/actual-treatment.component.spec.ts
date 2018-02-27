import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualTreatmentComponent } from './actual-treatment.component';

describe('ActualTreatmentComponent', () => {
  let component: ActualTreatmentComponent;
  let fixture: ComponentFixture<ActualTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
