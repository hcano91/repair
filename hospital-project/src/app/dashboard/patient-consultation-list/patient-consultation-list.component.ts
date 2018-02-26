
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PatientService } from  '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { ConsultationService } from  '../../services/consultation.service';
import { Consultation } from '../../models/consultation.model';
import * as _ from "lodash";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-consultation-list',
  templateUrl: './patient-consultation-list.component.html',
  styleUrls: ['./patient-consultation-list.component.css']
})
export class PatientConsultationListComponent implements OnInit {
  consultationList: Consultation[];
  nextKey: any;
  previousKeys: any[] = [];
  subscription: any;
  options: any;
  
  @Output() visibleSectionEvent = new EventEmitter<string>();
  @Output() consultationTypeEvent = new EventEmitter<string>();

  constructor(private consultationService: ConsultationService,
    private patientService: PatientService) { 
    this.options = {
      consultationType: ''
    }
  }

  onEditButtonClick(consultation: Consultation) {
    this.consultationService.selectedConsultation.data = Object.assign({}, consultation);
    this.options.consultationType = this.consultationService.selectedConsultation.data.consultationType;
    this.enterEditMode();
  }

  onCleanSearchClick(consultationForm: NgForm) {
    this.options = {
      consultationType: ''
    }
    this.getConsultations();
  }

  onDeleteButtonClick($key:string) {
    this.consultationService.delete($key);
  }

  getConsultations(key?) {
    var patientKey = this.patientService.selectedPatient.data.$key;
    this.subscription = this.consultationService.getConsultationsFromPatientKey(patientKey).snapshotChanges()
      .subscribe(patients => {
        this.consultationList = [];
        _.slice(patients, 0).forEach(element => {
          var y  = element.payload.toJSON();
          y["$key"] = element.key;
          this.consultationList.push(y as Consultation);
        });
      });
  }

  enterEditMode() {
    console.log("consultation");
    this.visibleSectionEvent.emit('consultation');
    this.consultationTypeEvent.emit(this.options.consultationType);
  }

  onSubmitSearchForm(consultationForm: NgForm){
    console.log(this.options.consultationType);
  }

  ngOnInit() {
    this.getConsultations();
    this.options.consultationType = '';
  }

}
