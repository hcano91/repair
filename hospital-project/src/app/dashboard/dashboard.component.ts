import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/core/authentication.service';
import { UserService } from '../services/core/user.service';
import { FormControl, Validators } from '@angular/forms';
import { SystemState } from '../services/core/systemState.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ PatientService ]
})
export class DashboardComponent implements OnInit {
  router:Router;
  editMode: boolean = false;
  constructor( router:Router, 
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private systemState: SystemState,
      private patientService: PatientService ) {
    this.router = router;
  }

  recieveEditModeEvent($event) {
    this.editMode = $event; 
  }

  ngOnInit() {
  }

}
