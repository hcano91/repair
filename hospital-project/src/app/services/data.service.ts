import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth"
import * as firebase from 'firebase/app';

@Injectable()
export class DataService{
    firebaseReferense;
    constructor(public afAuth: AngularFireAuth) {
        this.firebaseReferense = firebase.database().ref();
    }
    getUserDataQuery(uid) {
        let usersfirebaseReferense = this.firebaseReferense.child('users/' + uid);
        return usersfirebaseReferense.once('value');
    }
}