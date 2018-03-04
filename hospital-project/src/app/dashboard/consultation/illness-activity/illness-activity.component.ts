import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive';

@Component({
  selector: 'app-illness-activity',
  templateUrl: './illness-activity.component.html',
  styleUrls: ['./illness-activity.component.css']
})
export class IllnessActivityComponent implements OnInit {
  @Input() consultationType: string;
  constructor(public consultationService: ConsultationService) { }

  ngOnInit() {
  }

}
