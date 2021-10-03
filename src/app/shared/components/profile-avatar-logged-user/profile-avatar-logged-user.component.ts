import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-avatar-logged-user',
  templateUrl: './profile-avatar-logged-user.component.html',
  styleUrls: ['./profile-avatar-logged-user.component.scss'],
})
export class ProfileAvatarLoggedUserComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  public get loggedUserAvatar(): string {
    // TODO: tmp mocked - use DI injected image from server
    return '/assets/images/login-page-2.png';
  }
}
