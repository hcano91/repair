import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive';

@Component({
  selector: 'app-radiography',
  templateUrl: './radiography.component.html',
  styleUrls: ['./radiography.component.css']
})
export class RadiographyComponent implements OnInit {

  constructor(public consultationService: ConsultationService) { }

  ngOnInit() {
  }

}
