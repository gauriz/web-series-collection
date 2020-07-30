import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<any>();
  @Input() webDevice = true;

  selectedNav = [];
  sideNavOptions = [{
    text: 'Home',
    redirectUrl: ''
  }];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.selectedNav = [this.sideNavOptions[0]];
  }

  closeSideNavigation(): void {
    this.closeSideNav.emit(true);
  }

  selectedValue(event): void {
    const menuSelected = event.option.value;
    this.router.navigate([menuSelected.redirectUrl]);
    this.closeSideNav.emit(true);
  }
}
