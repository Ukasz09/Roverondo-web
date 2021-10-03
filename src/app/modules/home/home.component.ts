import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public drawerIsOpen = false;

  constructor() {}

  ngOnInit(): void {}

  public onDrawerOpenStart(): void {
    this.drawerIsOpen = true;
  }

  public onDrawerCloseStart(): void {
    this.drawerIsOpen = false;
  }
}
