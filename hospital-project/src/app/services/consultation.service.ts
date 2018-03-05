import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Consultation } from '../models/consultation.model';

@Injectable()
export class ConsultationService {
  consultationsList: AngularFireList<any>;
  selectedConsultation: Consultation = new Consultation();

  constructor(private firebase: AngularFireDatabase ) {
    this.selectedConsultation.data = {};
  }

  getConsultations(offset, startKey?, options?): AngularFireList<any> {
    if( startKey == null ) {
      this.consultationsList = this.firebase.list('consultations', ref => ref.orderByKey().limitToFirst(offset + 1));
    }
    else
      this.consultationsList = this.firebase.list('consultations', ref => ref.orderByKey().startAt(startKey).limitToFirst(offset + 1));
    return this.consultationsList;
  }

  getConsultationsByMillisecondRange(startMillisecond, endMillisecond): AngularFireList<any> {
    this.consultationsList = this.firebase.list('consultations', ref => ref.orderByChild('consultationDateMilliseconds').startAt(startMillisecond).endAt(endMillisecond));
    return this.consultationsList;
  }

  getConsultationsFromPatientKey(patientKey): AngularFireList<any> {
    this.consultationsList = this.firebase.list('consultations', ref => ref.orderByChild("patientKey").equalTo(patientKey));
    return this.consultationsList;
  }

  insert(consultation: Consultation){
    var consultationKeys = Object.keys(consultation.data);
    var objectToPush = {};
    
    consultationKeys.forEach(consultationKey => {
      objectToPush[consultationKey] = consultation.data[consultationKey] ? consultation.data[consultationKey] : '';
    });
    delete objectToPush['$key'];
    this.consultationsList.push(objectToPush);
  }

  update( consultation: Consultation) {
    var consultationKeys = Object.keys(consultation.data);
    var objectToUpdate = {};
    consultationKeys.forEach(consultationKey => {
      objectToUpdate[consultationKey] = consultation.data[consultationKey] ? consultation.data[consultationKey] : '';
    });
    delete objectToUpdate['$key'];
    this.consultationsList.update(consultation.data.$key, objectToUpdate);
  }

  delete($key: string){
    this.consultationsList.remove($key);
  }

}
