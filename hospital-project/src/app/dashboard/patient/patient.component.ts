import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor(private patientService: PatientService,
    private toastrService: ToastrService) {  }

  onSubmitForm(patientForm: NgForm) {
    if(patientForm.value.$key == null)
      this.patientService.insert(patientForm.value);
    else
      this.patientService.update(patientForm.value);
    this.onResetButtonClick(patientForm);
    this.editModeEvent.emit(false);
    this.toastrService.success('Submitted Successfully', "Patient Register");
  }

  onResetButtonClick(patientForm?: NgForm){
    if(patientForm != null)
      patientForm.reset();
    this.patientService.selectedPatient = {
      $key: null,
      name: '',
      position: '',
      office: '',
      salary: null
    }
  }

  exitEditMode() {
    this.onResetButtonClick();
    this.editModeEvent.emit(false);
  }

  ngOnInit() {
    this.onResetButtonClick();
  }

}
