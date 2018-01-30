import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  router:Router;

	hasAccount:boolean = true;
  registrationWasSuccessful:boolean = false;
  login:{ email:string, password:string, rememberMe:boolean } = {
			email: "",
			password: "",
			rememberMe: false
  };

	constructor( router:Router, private authenticationService: AuthenticationService ) {
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
  
  onSubmit(data,event):void{
    /* console.log(arguments);
    console.log(data);
    console.log(event); */

    this.authenticationService.loginEmailPassword( this.login.email, this.login.password)
      .then((data)=>{
        console.log("SUCCESS", data.uid);
      })
      .catch((error)=>{
        console.log("ERROR", error)
      })

    //this.router.navigateByUrl("home");
  }

  ngOnInit() {
  }

}
