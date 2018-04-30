import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthData {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  currentLoginUser(){
    
  }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signupUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      // firebase.database().ref('/users').child(email).set({
      //    firstName: "anonymous",
      //   id:newUser.uid,
      // });
      //   firebase.database().ref('/userProfile').child(newUser.uid).set({
      //       firstName: "anonymous",
      //        email: email
      // });
    });
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

}