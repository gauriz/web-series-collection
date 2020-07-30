import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string): Promise<void> {
    const result = await this.afAuth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['admin/list']);
  }

  async register(email: string, password: string): Promise<void> {
    const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return this.sendEmailVerification(email, password);
  }

  async sendEmailVerification(email, password): Promise<void> {
    await this.afAuth.sendSignInLinkToEmail(email, password);
    // this.router.navigate(['admin/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string): Promise<void> {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    // this.router.navigate(['admin/login']);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  async loginWithGoogle(): Promise<auth.UserCredential> {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  async loginWithFB(): Promise<auth.UserCredential> {
    return this.afAuth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  async loginWithGithub(): Promise<auth.UserCredential> {
    return this.afAuth.signInWithPopup(new auth.GithubAuthProvider());
  }

  async loginWithPhone(): Promise<auth.UserCredential> {
    return this.afAuth.signInWithPopup(new auth.PhoneAuthProvider());
  }

  async loginWithTwitter(): Promise<auth.UserCredential> {
    return this.afAuth.signInWithPopup(new auth.TwitterAuthProvider());
  }

  async loginWithEmail(): Promise<auth.UserCredential> {
    return this.afAuth.signInWithPopup(new auth.OAuthProvider('facebook.com'));
  }
}
