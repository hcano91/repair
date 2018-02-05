
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../services/data.service';
import { SystemState } from '../services/systemState.service';

@Injectable()
export class GotUserInfoGuard implements Resolve<any> {
  constructor(
    private readonly afAuth: AngularFireAuth, 
    private readonly router: Router,
    private dataService: DataService,
    private systemState: SystemState) {
  }
  resolve(): Promise<any> {

    return this.dataService.getUserDataQuery(this.systemState.uid)
          .then((data)=>{console.log(data);this.systemState.setUserData(data);})
          .catch((error)=>{this.router.navigate(['login']);})
      
  
  }
}