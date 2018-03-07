import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PatientService } from  '../../services/patient.service';
import { ConsultationService } from  '../../services/consultation.service';
import { NgForm, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ElectronService } from 'ngx-electron';
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

  
  _moment:any;

  constructor( public patientService: PatientService,
    public consultationService: ConsultationService,
    private toastrService: ToastrService,
    private electronService: ElectronService) { 
      this._moment = moment;
  }

  onSubmitForm(consultationForm: NgForm) {
    var upsertObject = {
      data: consultationForm.value
    }
    upsertObject.data.patientKey = this.patientService.selectedPatient.data.$key;
    upsertObject.data.fullName = this.patientService.selectedPatient.data.names + ' ' + this.patientService.selectedPatient.data.fatherLastName + ' ' + this.patientService.selectedPatient.data.motherLastName;
    upsertObject.data.consultationType = this.consultationType;
    upsertObject.data.consultationTime = moment().format('LT').valueOf();
    upsertObject.data.consultationDate = moment(new Date()).format("MM-DD-YYYY").valueOf();    
    upsertObject.data.consultationDateMilliseconds = moment(new Date()).format("x").valueOf();    
    upsertObject.data.patientActualDate = upsertObject.data.patientActualDate ? upsertObject.data.patientActualDate : this.getAge(this.patientService.selectedPatient.data.dateOfBirth);
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

  getToday() {
    return moment(new Date()).format("MM-DD-YYYY").valueOf();
  }

  getActualTime() {
    return moment().format('LT').valueOf();
  }

  getAge(date){
    return Math.floor(moment(new Date()).diff(moment(date,"YYYY-MM-DD"),'years',true));
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

  printToPDF() {
    var ipc = this.electronService.ipcRenderer;
    ipc.send('print-to-pdf');
  }

  ngOnInit() {
    this.resetForm();
  }

}
