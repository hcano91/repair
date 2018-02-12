import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Patient } from '../models/patient.model';

@Injectable()
export class PatientService {
  patientList: AngularFireList<any>;
  selectedPatient: Patient = new Patient();
  private static MAX_PAGE_RESULT = 2;

  constructor(private firebase: AngularFireDatabase ) { }

  getList(startWith?) {
    if(startWith == null)
      this.patientList = this.firebase.list('patients', ref => ref.limitToFirst(PatientService.MAX_PAGE_RESULT + 1));
    else
      this.patientList = this.firebase.list('patients', ref => ref.startAt(startWith).limitToFirst(PatientService.MAX_PAGE_RESULT + 1));
    return this.patientList;
  }

  getPatients(offset, startKey?): AngularFireList<any> {
    if( startKey == null ) {
      this.patientList = this.firebase.list('patients', ref => ref.orderByKey().limitToFirst(offset + 1));
    }
    else
      this.patientList = this.firebase.list('patients', ref => ref.orderByKey().startAt(startKey).limitToFirst(offset + 1));
    return this.patientList;
  }

  insert(patient: Patient){
    var patientKeys = Object.keys(patient);
    var objectToPush = {};
    
    patientKeys.forEach(patientKey => {
      objectToPush[patientKey] = patient[patientKey];
    });
    delete objectToPush['$key'];
    this.patientList.push(objectToPush);
  }

  update( patient: Patient) {
    var patientKeys = Object.keys(patient);
    var objectToUpdate = {};
    patientKeys.forEach(patientKey => {
      objectToUpdate[patientKey] = patient[patientKey];
    });
    delete objectToUpdate['$key'];
    this.patientList.update(patient.$key, objectToUpdate);
  }

  delete($key: string){
    this.patientList.remove($key);
  }

}
