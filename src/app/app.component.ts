import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../common/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
const googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
const facebookLogoURL = 'https://cdn.worldvectorlogo.com/logos/facebook-3.svg';
const github = 'https://cdn.worldvectorlogo.com/logos/github-1.svg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';
  webDevice = true;
  loggedIn;
  open = false;
  constructor(breakpointObserver: BreakpointObserver, private auth: AuthService,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL));
    this.matIconRegistry.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl(facebookLogoURL));
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(github));
    // breakpointObserver.observe([
    //   // Breakpoints.Tablet,
    //   Breakpoints.Handset
    // ]).subscribe(result => {
    //   if (result.matches) {
    //     this.webDevice = false;
    //   } else {
    //     this.webDevice = true;
    //   }
    //   console.log(this.webDevice);
    //   // util.emit({ webDevice: this.webDevice });
    // });
  }

  ngOnInit(): void {
    this.loggedIn = JSON.parse(localStorage.getItem('user'))['photoURL'];
  }

  close(reason: string): void {
    this.reason = reason;
    this.sidenav.close();
  }

  async loginWithFB(): Promise<void> {
    try {
      const login = await this.auth.loginWithFB();
      // const loginDetails = {
      //   isNewUser: login.additionalUserInfo.isNewUser,
      //   user: login.additionalUserInfo.profile
      // }
      console.log(login);
    } catch (err) {
      console.log(err);
      console.log('Err - Popup might be blocked. Enable popup');
    }
  }

  async loginWithGoogle(): Promise<void> {
    try {
      const login = await this.auth.loginWithGoogle();
      console.log(login);
      const user = {
        // tslint:disable: no-string-literal
        photoUrl: login.additionalUserInfo.profile['picture'],
        userName: login.additionalUserInfo.profile['given_name'],
        fullName: login.additionalUserInfo.profile['name'],
        email: login.additionalUserInfo.profile['email'],
        isNewUser: login.additionalUserInfo.isNewUser,
        provider: login.credential.providerId
      };
      localStorage.setItem('user', JSON.stringify(user));
      this.loggedIn = login.additionalUserInfo.profile['picture'];
    } catch (err) {
      console.log(err.message);
    }
  }

  async loginWithGitHub(): Promise<void> {
    try {
      const login = await this.auth.loginWithGithub();
      console.log(login);
      const user = {
        // tslint:disable: no-string-literal
        photoUrl: login.additionalUserInfo.profile['avatar_url'],
        userName: login.additionalUserInfo.profile['login'],
        fullName: login.additionalUserInfo.profile['name'],
        email: login.additionalUserInfo.profile['email'],
        isNewUser: login.additionalUserInfo.isNewUser,
        provider: login.credential.providerId
      };
      localStorage.setItem('user', JSON.stringify(user));
      this.loggedIn = login.additionalUserInfo.profile['avatar_url'];
    } catch (err) {
      console.log(err);
      console.log('Err - Popup might be blocked. Enable popup');
    }
  }

  logout(): void {
    this.auth.logout();
    this.loggedIn = false;
  }

}
