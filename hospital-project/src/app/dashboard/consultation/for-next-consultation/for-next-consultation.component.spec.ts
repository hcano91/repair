import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForNextConsultationComponent } from './for-next-consultation.component';

describe('ForNextConsultationComponent', () => {
  let component: ForNextConsultationComponent;
  let fixture: ComponentFixture<ForNextConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForNextConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForNextConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
