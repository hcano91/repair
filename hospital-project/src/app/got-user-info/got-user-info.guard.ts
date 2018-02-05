
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class GotUserInfoGuard implements Resolve<any> {
  constructor(
    private readonly afAuth: AngularFireAuth, 
    private readonly router: Router,) {
  }
  resolve(): Subscription {
    return this.afAuth.authState.subscribe(data => {
      if(data === null){
        this.router.navigate(['login']);
      }
    });
  }
}