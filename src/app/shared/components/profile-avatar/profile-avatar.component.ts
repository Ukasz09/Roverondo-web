import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss'],
})
export class ProfileAvatarComponent implements OnInit {
  // TODO: use placeholder / default img instead
  @Input() avatarImgPath: string = '/assets/images/login-page-2.png';

  constructor() {}

  ngOnInit(): void {}

  get avatarStyles() {
    return {
      'background-image': `url(${this.avatarImgPath})`,
    };
  }
}
