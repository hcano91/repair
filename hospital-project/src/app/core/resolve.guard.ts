import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../services/core/user.service';
import { SystemState } from '../services/core/systemState.service';

@Injectable()
export class ResolveGuard implements Resolve<any> {
  constructor(
    private readonly afAuth: AngularFireAuth, 
    private readonly router: Router,
    private userService: UserService,
    private systemState: SystemState,) {
  }
  resolve(): Subscription {
    return this.afAuth.authState.subscribe(data => {
      if(data === null){
        this.router.navigate(['login']);
      } else {
        this.systemState.uid = data.uid;
      }
    });
  }
}
