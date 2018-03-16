import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PatientService } from  '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import * as _ from "lodash";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patientList: Patient[];
  offset = 10;
  nextKey: any;
  previousKeys: any[] = [];
  subscription: any;
  options: any;
  
  @Output() visibleSectionEvent = new EventEmitter<string>();

  constructor(private patientService: PatientService) { 
    this.options = {
      searchType: '',
      searchValue: ''
    }
  }

  onNextButtonClick() {
    this.previousKeys.push(_.first(this.patientList)["$key"])
    this.getPatients(this.nextKey);
  }

  onPreviousButtonClick(){
    const previousKey = _.last(this.previousKeys);
    this.previousKeys = _.dropRight(this.previousKeys);
    this.getPatients(previousKey);
  }

  onEditButtonClick(patient: Patient) {
    this.enterEditMode();
    this.patientService.selectedPatient.data = Object.assign({}, patient);
  }

  onCleanSearchClick(searchForm: NgForm) {
    this.options = {
      searchType: '',
      searchValue: ''
    }
    this.getPatients();
  }

  onDeleteButtonClick($key:string) {
    this.patientService.delete($key);
  }

  getPatients(key?) {
    this.subscription = this.patientService.getPatients(this.offset, key, this.options).snapshotChanges()
      .subscribe(patients => {
        this.patientList = [];
        var startAt = 1;
        var endAt = patients.length;
        if(patients.length < this.offset + 1){
          startAt = 0;
        }
        _.slice(patients, startAt, endAt).forEach(element => {
          var y  = element.payload.toJSON();
          y["$key"] = element.key;
          this.patientList.unshift(y as Patient);
        });
        if(patients.length === this.offset + 1)
          this.nextKey = _.get(patients[0], 'key');
        else
          this.nextKey = null;
      });
  }

  enterEditMode() {
    this.visibleSectionEvent.emit('patient');
  }

  enterReportMode() {
    this.visibleSectionEvent.emit('report');
  }

  onSubmitSearchForm(searchForm: NgForm){
    var patients = this.patientList;
    this.subscription = this.patientService.getPatientsByData(this.options.searchType, this.options.searchValue).snapshotChanges()
      .subscribe(patients => {
        this.patientList = [];
        var startAt = 1;
        if(patients.length < this.offset + 1){
          startAt = 0;
        }
        _.slice(patients, startAt).forEach(element => {
          var y  = element.payload.toJSON();
          y["$key"] = element.key;
          this.patientList.unshift(y as Patient);
        });
        if(patients.length === this.offset + 1)
          this.nextKey = _.get(patients[0], 'key');
        else
          this.nextKey = null;
      });
  }

  ngOnInit() {
    this.getPatients();
  }

}
