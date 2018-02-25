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
        _.slice(patients, 0, this.offset).forEach(element => {
          var y  = element.payload.toJSON();
          y["$key"] = element.key;
          this.patientList.push(y as Patient);
        });
        this.nextKey = _.get(patients[this.offset], 'key');
      });
  }

  enterEditMode() {
    this.visibleSectionEvent.emit('patient');
  }

  onSubmitSearchForm(searchForm: NgForm){
    console.log(this.options.searchType, this.options.searchValue);
  }

  ngOnInit() {
    this.getPatients();
  }

}
