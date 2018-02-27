import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveAnalysisComponent } from './objective-analysis.component';

describe('ObjectiveAnalysisComponent', () => {
  let component: ObjectiveAnalysisComponent;
  let fixture: ComponentFixture<ObjectiveAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectiveAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
