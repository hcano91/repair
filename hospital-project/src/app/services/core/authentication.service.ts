import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth"
import * as firebase from 'firebase/app';

@Injectable()
export class AuthenticationService{
    constructor(public afAuth: AngularFireAuth) {
    }
    loginEmailPassword(loginEmail, loginPassword) {
        return this.afAuth.auth.signInWithEmailAndPassword(loginEmail, loginPassword);
    }
    loginGoogle() {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    sendPasswordResetEmail(loginEmail) {
        return this.afAuth.auth.sendPasswordResetEmail(loginEmail);
    }
    currentUser() {
        return this.afAuth.auth.currentUser;
    }
    logout() {
        return this.afAuth.auth.signOut();
    }
}