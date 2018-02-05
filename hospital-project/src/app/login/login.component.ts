import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { SystemState } from '../services/systemState.service';
import { ErrorTranslationService } from "../services/errorTranslation.service";
import { trigger, state, style, animate, transition } from '@angular/animations'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ])/*,
      transition(':leave', [
        animate(500, style({opacity:0})) 
      ])*/
    ])
  ]
})
export class LoginComponent implements OnInit {

  router:Router;
  registrationWasSuccessful:boolean = false;
  forgotPassword:boolean = false;
  login:{ email:string, password:string } = {
			email: "",
			password: ""
  };
  errorMessage:string = "";
  successMessage:string = "";
  loading:boolean = false;

  constructor( router:Router, 
      private authenticationService: AuthenticationService,
      private dataService: DataService,
      private systemState: SystemState,
      private readonly errorTranslationService: ErrorTranslationService) {
    this.router = router;
  }

  onEmailChange():void{
    if(this.errorMessage.length > 0 || this.successMessage.length > 0){
      this.errorMessage = '';
      this.successMessage = '';
    }
  }
  setForgotPassword(isTrue:boolean, event):void{
    event.preventDefault();
    this.forgotPassword = isTrue;
  }
  manageError(error):void {
    this.loading=false;
    this.errorMessage = this.errorTranslationService.getTranslatedError(error);
  }

	onLoginButtonClick(data,event):void{this.loading = true}
  onSubmitLogin(data,event):void{
    this.errorMessage = '';
    this.authenticationService.loginEmailPassword(this.login.email, this.login.password)
      .then((data)=>{this.onLoginSuccessfull();})
      .catch((error)=>{this.manageError(error);})
  }
  onLoginSuccessfull():void {
    this.dataService.getUserDataQuery(this.authenticationService.currentUser().uid)
      .then((data)=>{this.onLogin(data);})
      .catch((error)=>{this.manageError(error);})
  }
  onLogin(data):void {
    this.loading = false;
    this.systemState.setUserData(data);
    this.router.navigate(['dashboard']);
	}

  onForgotPasswordButtonClick(data,event):void{this.loading = true}
  onSubmitForgotPassword(data,event):void{
    this.errorMessage = '';
    this.authenticationService.sendPasswordResetEmail(this.login.email)
      .then((data)=>{this.onForgotPasswordMessageSent()})
      .catch((error)=>{this.manageError(error);})
  }
  onForgotPasswordMessageSent():void {
    this.loading=false;
    this.successMessage = 'Mensaje Enviado. Cambie su contraseña e intente entrar.';
  }
  
  test():void {
    
  }

  ngOnInit() {
  }

}
