import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliaryStudiesComponent } from './auxiliary-studies.component';

describe('AuxiliaryStudiesComponent', () => {
  let component: AuxiliaryStudiesComponent;
  let fixture: ComponentFixture<AuxiliaryStudiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliaryStudiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliaryStudiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
