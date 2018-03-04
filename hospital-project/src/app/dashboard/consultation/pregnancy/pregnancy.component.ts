import { Component, OnInit, Input } from '@angular/core';
import { ConsultationService } from  '../../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ProvideConsultationFormDirective } from '../../../directives/provide-consultation-form.directive'
import { PatientService } from '../../../services/patient.service';
import * as moment from 'moment';

@Component({
  selector: 'app-pregnancy',
  templateUrl: './pregnancy.component.html',
  styleUrls: ['./pregnancy.component.css']
})
export class PregnancyComponent implements OnInit {

  constructor(public consultationService: ConsultationService,
    private patientService: PatientService) { }
    @Input() consultationType: string;
    getAge() {
      var age = 0;
      try{
        age = Math.floor(moment(new Date()).diff(moment(this.patientService.selectedPatient.data.dateOfBirth,"YYYY-MM-DD"),'years',true));
      }
      catch(e){

      }
      return (age >=15 && age <=40);
    }
    
  ngOnInit() {
  }

}
