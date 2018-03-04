import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive';

@Component({
  selector: 'app-for-next-consultation',
  templateUrl: './for-next-consultation.component.html',
  styleUrls: ['./for-next-consultation.component.css']
})
export class ForNextConsultationComponent implements OnInit {

  @Input() consultationType: string;
  constructor(public consultationService: ConsultationService) { }

  ngOnInit() {
  }

}
