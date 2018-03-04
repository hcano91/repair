import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive';

@Component({
  selector: 'app-actual-treatment',
  templateUrl: './actual-treatment.component.html',
  styleUrls: ['./actual-treatment.component.css']
})

export class ActualTreatmentComponent implements OnInit {
  @Input() consultationType: string;

  constructor(public consultationService: ConsultationService) { }

  canShow(previousInput) {
    if(typeof previousInput === 'undefined') {
      return true;
    }

    if(typeof previousInput.value === 'undefined') {
      return true;
    }

    if(previousInput === null) {
      return true;
    }

    if(previousInput.value === null) {
      return true;
    }

    if(previousInput.value.length === 0) {
      return true;
    }

    return false;
  }

  ngOnInit() {
  }

}
