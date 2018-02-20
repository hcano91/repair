import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Patient } from '../models/patient.model';

@Injectable()
export class PatientService {
  patientList: AngularFireList<any>;
  selectedPatient: Patient = new Patient();

  constructor(private firebase: AngularFireDatabase ) { }

  getPatients(offset, startKey?): AngularFireList<any> {
    if( startKey == null ) {
      this.patientList = this.firebase.list('patients', ref => ref.orderByKey().limitToFirst(offset + 1));
    }
    else
      this.patientList = this.firebase.list('patients', ref => ref.orderByKey().startAt(startKey).limitToFirst(offset + 1));
    return this.patientList;
  }

  insert(patient: Patient){
    var patientKeys = Object.keys(patient.data);
    var objectToPush = {};
    
    patientKeys.forEach(patientKey => {
      objectToPush[patientKey] = patient.data[patientKey];
    });
    delete objectToPush['$key'];
    this.patientList.push(objectToPush);
  }

  update( patient: Patient) {
    var patientKeys = Object.keys(patient.data);
    var objectToUpdate = {};
    patientKeys.forEach(patientKey => {
      objectToUpdate[patientKey] = patient.data[patientKey];
    });
    delete objectToUpdate['$key'];
    this.patientList.update(patient.data.$key, objectToUpdate);
  }

  delete($key: string){
    this.patientList.remove($key);
  }

}
