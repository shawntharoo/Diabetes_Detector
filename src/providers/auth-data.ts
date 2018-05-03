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

  // signInWithPhoneNumber() {
  //   this.afAuth.auth.useDeviceLanguage();
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  //   var phoneNumber = getPhoneNumberFromUserInput();
  //   var appVerifier = window.recaptchaVerifier;
  //   firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
  //     .then(function (confirmationResult) {
  //       // user in with confirmationResult.confirm(code).
  //       window.confirmationResult = confirmationResult;
  //     }).catch(function (error) {
  //       window.recaptchaVerifier.render().then(function(widgetId) {
  //         grecaptcha.reset(widgetId);
  //       }
  //     });
  // }

  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signInWithFacebook() {
    console.log('Sign in with google');
    return this.oauthSignIn(new firebase.auth.FacebookAuthProvider());
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
            // var emailt = this.transform(result);
            // this.db.list('UserProfiles').set(emailt, {
            //   email: result,
            // })

            
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

  signupPatient(firstname: string, lastname: string, email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      var emailt = this.transform(email);
      this.db.list('UserProfiles').set(emailt, {
        email: email,
        firstname: firstname,
        lastname: lastname
      })

    });
  }

  signupDoctor(firstname: string, lastname: string, email: string, password: string, regNo: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      var emailt = this.transform(email);
        this.db.list('DoctorProfiles').set(emailt, {
          email: email,
          firstname: firstname,
          lastname: lastname,
          reg_no: regNo
        })

    });
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser() {
    return this.afAuth.auth.signOut();
  }

  transform(email) {
    return email.replace(/\./g, ',');
  }

}