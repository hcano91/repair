import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/core/authentication.service';
import { UserService } from '../services/core/user.service';
import { FormControl, Validators } from '@angular/forms';
import { SystemState } from '../services/core/systemState.service';
import { PatientService } from '../services/patient.service';
import { ConsultationService } from '../services/consultation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ PatientService, ConsultationService ]
})
export class DashboardComponent implements OnInit {
  router:Router;
  visibleSection: string = 'patient-list';
  consultationType: string = '';
  isEditingPatient: boolean = false;
  isEditingConsultation: boolean = false;
  
  constructor( router:Router, 
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private systemState: SystemState,
      private patientService: PatientService,
      private consultationService: ConsultationService ) {
    this.router = router;
  }
  

  recieveVisibleSectionEvent($event) {
    this.visibleSection = $event;
  }

  recieveConsultationTypeEvent($event){
    this.consultationType = $event;
  }

  theresEditingPatient():boolean {
    return !!this.patientService.selectedPatient.data.$key;
  }

  theresEditingConsultation():boolean {
    return !!this.consultationService.selectedConsultation.data.$key;
  }

  ngOnInit() {
  }

}
