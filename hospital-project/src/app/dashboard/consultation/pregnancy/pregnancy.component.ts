import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive'

@Component({
  selector: 'app-pregnancy',
  templateUrl: './pregnancy.component.html',
  styleUrls: ['./pregnancy.component.css']
})
export class PregnancyComponent implements OnInit {

  constructor(public consultationService: ConsultationService) { }

  ngOnInit() {
  }

}
