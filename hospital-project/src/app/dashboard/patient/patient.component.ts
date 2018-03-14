import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PatientService } from  '../../services/patient.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  @Output() visibleSectionEvent = new EventEmitter<string>();
  @Input() isEditingPatient: boolean;

  constructor(public patientService: PatientService,
    private toastrService: ToastrService) {  }

  onSubmitForm(patientForm: NgForm) {
    var upsertObject = {
      data: patientForm.value
    }
    upsertObject.data.fullName = patientForm.value.names + ' ' + patientForm.value.fatherLastName + ' ' + patientForm.value.motherLastName;
    if(upsertObject.data.$key == null)
      this.patientService.insert(upsertObject);
    else
      this.patientService.update(upsertObject);
    this.onResetButtonClick(patientForm);
    this.visibleSectionEvent.emit('patient-list');
    this.toastrService.success('Submitted Successfully', "Patient Register");
  }

  getAge(date){
    return Math.floor(moment(new Date()).diff(moment(date,"YYYY-MM-DD"),'years',true));
  }

  onResetButtonClick(patientForm?: NgForm){
    this.resetForm(patientForm);
  }

  resetForm(patientForm?: NgForm) {
    if(!!patientForm)
      patientForm.reset();
    this.patientService.selectedPatient = {data:{}};
  }

  getAgeValid() {
    var age = 0;
    try{
      age = Math.floor(moment(new Date()).diff(moment(this.patientService.selectedPatient.data.dateOfBirth,"YYYY-MM-DD"),'years',true));
    }
    catch(e){

    }
    return (age >=15 && age <=44);
  }

  exitEditMode() {
    this.resetForm();
    this.visibleSectionEvent.emit('patient-list');
  }

  ngOnInit() {
    this.resetForm();
  }

}
