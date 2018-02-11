
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services/core/user.service';
import { SystemState } from '../services/core/systemState.service';

@Injectable()
export class GotUserInfoGuard implements Resolve<any> {
  constructor(
    private readonly afAuth: AngularFireAuth, 
    private readonly router: Router,
    private userService: UserService,
    private systemState: SystemState) {
  }
  resolve(): Promise<any> {

    return this.userService.getUserDataQuery(this.systemState.uid)
          .then((data)=>{console.log(data);this.systemState.setUserData(data);})
          .catch((error)=>{this.router.navigate(['login']);})
      
  
  }
}