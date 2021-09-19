import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-aside-mobile',
  templateUrl: './aside-mobile.component.html',
  styleUrls: ['./aside-mobile.component.scss'],
})
export class AsideMobileComponent implements OnInit {
  @Output() hamburgerMenuClick: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public onHamburgerMenuClick(): void {
    this.hamburgerMenuClick.emit();
  }
}
