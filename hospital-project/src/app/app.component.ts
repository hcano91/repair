import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { ErrorTranslationService } from "./services/errorTranslation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  router:Router;
  loadingLogoutButton:boolean = false;
  constructor(router:Router,
    private authenticationService:AuthenticationService,
    private errorTranslationService:ErrorTranslationService,
    public afAuth: AngularFireAuth){
    this.router = router;
  }
  logout() {
    this.loadingLogoutButton = true;
    this.authenticationService.logout()
      .then((data)=>{
        this.loadingLogoutButton = false;
        this.router.navigate(['login']);
      })
      .catch((error)=>{
        this.loadingLogoutButton = false;
        console.log("ERROR", this.errorTranslationService.getTranslatedError(error));
      })
  }
}
