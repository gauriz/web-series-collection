import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';
  webDevice = true;
  loggedIn = false;
  open = false;
  constructor(breakpointObserver: BreakpointObserver, private dialog: MatDialog) {
    breakpointObserver.observe([
      // Breakpoints.Tablet,
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches) {
        this.webDevice = false;
      } else {
        this.webDevice = true;
      }
      console.log(this.webDevice);
      // util.emit({ webDevice: this.webDevice });
    });
  }

  ngOnInit(): void {
  }

  close(reason: string): void {
    this.reason = reason;
    this.sidenav.close();
  }
}
