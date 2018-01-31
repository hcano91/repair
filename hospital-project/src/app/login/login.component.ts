import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { SystemState } from '../services/systemState.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  router:Router;
	hasAccount:boolean = true;
  registrationWasSuccessful:boolean = false;
  forgotPassword:boolean = false;
  login:{ email:string, password:string } = {
			email: "",
			password: ""
  };
  errorMessage:string = "";

  constructor( router:Router, 
      private authenticationService: AuthenticationService,
      private dataService: DataService,
      private systemState: SystemState ) {
    this.router = router;
  }

	onLogin():void {
    //this.router.navigate( [ "" ] );
    console.log('hi')
	}

	activateRegisterForm():void {
		this.hasAccount = false;
	}

	activateLoginForm():void {
		this.hasAccount = true;
  }

  onLoginButtonClick(data,event):void{}

  onForgotPasswordButtonClick(data,event):void{}

  setForgotPassword(isTrue:boolean, event):void{
    event.preventDefault();
    this.forgotPassword = isTrue;
  }
  
  onLoginSuccessfull() {
    this.dataService.getUserDataQuery(this.authenticationService.currentUser().uid)
      .then((data)=>{
        this.systemState.setUserData(data);
        this.router.navigate(['dashboard']);
      })
      .catch((error)=>{
        console.log("ERROR", error);
        this.errorMessage = error.message;
      })
  }

  onSubmitLogin(data,event):void{
    this.errorMessage = '';
    this.authenticationService.loginEmailPassword( this.login.email, this.login.password)
      .then((data)=>{
        this.onLoginSuccessfull();
      })
      .catch((error)=>{
        console.log("ERROR", error);
        this.errorMessage = error.message;
      })
  }

  onSubmitForgotPassword(data,event):void{
    this.errorMessage = '';
    this.authenticationService.sendPasswordResetEmail(this.login.email)
      .then((data)=>{
        console.log("SUCCESS", data);
      })
      .catch((error)=>{
        console.log("ERROR", error);
        this.errorMessage = error.message;
      })
  }

  ngOnInit() {
  }

}
