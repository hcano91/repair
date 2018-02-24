import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PatientService } from  '../../services/patient.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {


  @Output() editModeEvent = new EventEmitter<boolean>();
  @Input() isEditingPatient: boolean;

  constructor(public patientService: PatientService,
    private toastrService: ToastrService) {  }

  onSubmitForm(patientForm: NgForm) {
    var upsertObject = {
      data: patientForm.value
    }
    if(upsertObject.data.$key == null)
      this.patientService.insert(upsertObject);
    else
      this.patientService.update(upsertObject);
    this.onResetButtonClick(patientForm);
    this.editModeEvent.emit(false);
    this.toastrService.success('Submitted Successfully', "Patient Register");
  }

  onResetButtonClick(patientForm?: NgForm){
    this.resetForm(patientForm);
  }

  resetForm(patientForm?: NgForm) {
    if(!!patientForm)
      patientForm.reset();
    this.patientService.selectedPatient = {data:{}};
  }

  exitEditMode() {
    this.resetForm();
    this.editModeEvent.emit(false);
  }

  ngOnInit() {
    this.resetForm();
  }

}
