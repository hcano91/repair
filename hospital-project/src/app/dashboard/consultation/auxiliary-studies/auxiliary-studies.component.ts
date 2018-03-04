import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive';

@Component({
  selector: 'app-auxiliary-studies',
  templateUrl: './auxiliary-studies.component.html',
  styleUrls: ['./auxiliary-studies.component.css']
})
export class AuxiliaryStudiesComponent implements OnInit {
  @Input() consultationType: string;

  constructor(public consultationService: ConsultationService) { }

  ngOnInit() {
  }

}
