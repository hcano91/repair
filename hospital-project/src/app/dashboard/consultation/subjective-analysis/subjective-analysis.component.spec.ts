import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectiveAnalysisComponent } from './subjective-analysis.component';

describe('SubjectiveAnalysisComponent', () => {
  let component: SubjectiveAnalysisComponent;
  let fixture: ComponentFixture<SubjectiveAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectiveAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectiveAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
