import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { SystemState } from '../services/systemState.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  router:Router;
  constructor( router:Router, 
      private authenticationService: AuthenticationService,
      private dataService: DataService,
      private systemState: SystemState ) {
    this.router = router;
  }

  ngOnInit() {
    console.log("DATA", this.systemState.uid);
  }

}
