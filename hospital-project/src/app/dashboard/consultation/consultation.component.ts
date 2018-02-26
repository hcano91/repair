import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientService } from  '../../services/patient.service';
import { ConsultationService } from  '../../services/consultation.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  @Output() visibleSectionEvent = new EventEmitter<string>();
  @Input() consultationType: string;
  @Input() isEditingConsultation: boolean;

  constructor( private patientService: PatientService,
    private consultationService: ConsultationService,
    private toastrService: ToastrService) { }

  onSubmitForm(consultationForm: NgForm) {
    var upsertObject = {
      data: consultationForm.value
    }
    upsertObject.data.patientKey = this.patientService.selectedPatient.data.$key;
    upsertObject.data.fullName = this.patientService.selectedPatient.data.names + ' ' + this.patientService.selectedPatient.data.fatherLastName + ' ' + this.patientService.selectedPatient.data.motherLastName;
    upsertObject.data.consultationType = this.consultationType;
    if(upsertObject.data.$key == null){
      upsertObject.data.creationDate = moment().valueOf();
      this.consultationService.insert(upsertObject);
    }
    else{
      upsertObject.data.lastModifiedDate = moment().valueOf();
      this.consultationService.update(upsertObject);
    }
      
    this.onResetButtonClick(consultationForm);
    this.visibleSectionEvent.emit('patient');
    this.toastrService.success('Submitted Successfully', "Patient Register");
  }

  onResetButtonClick(consultationForm?: NgForm){
    this.resetForm(consultationForm);
  }

  resetForm(consultationForm?: NgForm) {
    if(!!consultationForm)
      consultationForm.reset();
    this.consultationService.selectedConsultation = {data:{}};
  }

  exitEditMode() {
    this.resetForm();
    this.visibleSectionEvent.emit('patient');
  }

  ngOnInit() {
    this.resetForm();
  }

}