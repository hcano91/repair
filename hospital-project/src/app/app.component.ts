import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  router:Router;
  constructor(router:Router,private authenticationService: AuthenticationService){
    this.router = router;
  }
  loggedIn(){
    return !!this.authenticationService.currentUser();
  }
  logout() {
    this.authenticationService.logout()
      .then((data)=>{
        console.log("SUCCESS", data);
        this.router.navigate(['login']);
      })
      .catch((error)=>{
        console.log("ERROR", error);
        //this.errorMessage = error.message;
      })
  }
}
