import { TestBed, inject } from '@angular/core/testing';

import { ConsultationService } from './consultation.service';

describe('ConsultationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultationService]
    });
  });

  it('should be created', inject([ConsultationService], (service: ConsultationService) => {
    expect(service).toBeTruthy();
  }));
});
