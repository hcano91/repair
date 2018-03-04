import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive';

@Component({
  selector: 'app-objective-analysis',
  templateUrl: './objective-analysis.component.html',
  styleUrls: ['./objective-analysis.component.css']
})
export class ObjectiveAnalysisComponent implements OnInit {
  @Input() consultationType: string;
  constructor(public consultationService: ConsultationService) { }

  ngOnInit() {
  }

}
