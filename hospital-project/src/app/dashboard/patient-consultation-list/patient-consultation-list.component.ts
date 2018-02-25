
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
  
  @Output() editModeEvent = new EventEmitter<any>();

  constructor(private consultationService: ConsultationService,
    private patientService: PatientService) { 
    this.options = {
      searchType: '',
      searchValue: ''
    }
  }

  onNextButtonClick() {
    this.previousKeys.push(_.first(this.consultationList)["$key"])
    this.getConsultations(this.nextKey);
  }

  onPreviousButtonClick(){
    const previousKey = _.last(this.previousKeys);
    this.previousKeys = _.dropRight(this.previousKeys);
    this.getConsultations(previousKey);
  }

  onEditButtonClick(patient: Consultation) {
    this.consultationService.selectedConsultation.data = Object.assign({}, patient);
  }

  onCleanSearchClick(searchForm: NgForm) {
    this.options = {
      searchType: '',
      searchValue: ''
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

  onSubmitSearchForm(searchForm: NgForm){
    console.log(this.options.searchType, this.options.searchValue);
  }

  ngOnInit() {
    this.getConsultations();
  }

}
