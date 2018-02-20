import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PatientService } from  '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import * as _ from "lodash";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patientList: Patient[];
  offset = 3;
  nextKey: any;
  previousKeys: any[] = [];
  subscription: any;
  
  @Output() editModeEvent = new EventEmitter<boolean>();

  constructor(private patientService: PatientService) { }


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
    console.log("onEdit", patient);
    this.enterEditMode();
    this.patientService.selectedPatient.data = Object.assign({}, patient);
  }

  getPatients(key?) {
    this.subscription = this.patientService.getPatients(this.offset, key).snapshotChanges()
      .subscribe(patients => {
        this.patientList = [];
        _.slice(patients, 0, this.offset).forEach(element => {
          var y  = element.payload.toJSON();
          y["$key"] = element.key;
          this.patientList.push(y as Patient);
        });
        this.nextKey = _.get(patients[this.offset], 'key');
      });
    
    /*x.snapshotChanges().subscribe(item => {
      this.patientList = [];
      item.forEach(element => {
        var y  = element.payload.toJSON();
        y["$key"] = element.key;
        this.patientList.push(y as Patient);
      })
    });*/
  }

  enterEditMode() {
    this.editModeEvent.emit(true);
  }

  ngOnInit() {
    this.getPatients();
  }

}
