import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../services/data.service';
import { SystemState } from '../services/systemState.service';

@Injectable()
export class ResolveGuard implements Resolve<any> {
  constructor(
    private readonly afAuth: AngularFireAuth, 
    private readonly router: Router,
    private dataService: DataService,
    private systemState: SystemState,) {
  }
  resolve(): Subscription {
    return this.afAuth.authState.subscribe(data => {
      if(data === null){
        this.router.navigate(['login']);
      } else {
        /*this.dataService.getUserDataQuery(data.uid)
          .then((data)=>{console.log(data);this.systemState.setUserData(data);})
          .catch((error)=>{this.router.navigate(['login']);})*/
        console.log('OnGuard', data.uid);
        this.systemState.uid = data.uid;
      }
    });
  }
}
