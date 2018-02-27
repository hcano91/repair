import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllnessActivityComponent } from './illness-activity.component';

describe('IllnessActivityComponent', () => {
  let component: IllnessActivityComponent;
  let fixture: ComponentFixture<IllnessActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllnessActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllnessActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
