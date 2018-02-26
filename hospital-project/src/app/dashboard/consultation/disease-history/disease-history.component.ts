import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive'

@Component({
  selector: 'app-disease-history',
  templateUrl: './disease-history.component.html',
  styleUrls: ['./disease-history.component.css']
})
export class DiseaseHistoryComponent implements OnInit {

  constructor(public consultationService: ConsultationService) { }

  ngOnInit() {
  }

}
