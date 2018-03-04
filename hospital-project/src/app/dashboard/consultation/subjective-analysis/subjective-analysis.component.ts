import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive'

@Component({
  selector: 'app-subjective-analysis',
  templateUrl: './subjective-analysis.component.html',
  styleUrls: ['./subjective-analysis.component.css']
})
export class SubjectiveAnalysisComponent  {
  @Input() consultationType: string;
  constructor(public consultationService: ConsultationService) {  }

  

}
