import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiographyComponent } from './radiography.component';

describe('RadiographyComponent', () => {
  let component: RadiographyComponent;
  let fixture: ComponentFixture<RadiographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadiographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
