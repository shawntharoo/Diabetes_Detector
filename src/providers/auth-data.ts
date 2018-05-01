import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireDatabase } from 'angularfire2/database';
import { Item } from 'ionic-angular';

@Injectable()
export class AuthData {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {

  }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signInWithGoogle() {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
        .then(() => {
          return this.afAuth.auth.getRedirectResult().then(result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            console.log(token, user);
          }).catch(function (error) {
            // Handle Errors here.
            alert(error.message);
          });
        });
    }
  }

  signupUser(firstname: string, lastname: string, email: string, password: string, role: string, regNo: string, doctor: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      var emailt = this.transform(email);
      if(role == 'doctor'){
        this.db.list('DoctorProfiles').set(emailt,{
          email : email,
          role : role,
          firstname : firstname,
          lastname : lastname,
          reg_no : regNo
        })
      }else if(role == 'patient'){
        this.db.list('UserProfiles').set(emailt,{
          email : email,
          role : role,
          firstname : firstname,
          lastname : lastname,
          doctor : doctor
        })
      }

    });
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

  transform(email) {
    return email.replace(/\./g,',');
  }

}