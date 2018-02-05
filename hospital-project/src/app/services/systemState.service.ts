import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth"
import * as firebase from 'firebase/app';

@Injectable()
export class SystemState{
    userData;
    public uid;
    constructor() {}
    setUserData(userData) {
        this.userData = userData;
    }

    getUserData() {
        return this.userData;
    }
}