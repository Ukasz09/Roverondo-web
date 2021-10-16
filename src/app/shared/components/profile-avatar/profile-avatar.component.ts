import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-profile-avatar",
  templateUrl: "./profile-avatar.component.html",
  styleUrls: ["./profile-avatar.component.scss"]
})
export class ProfileAvatarComponent implements OnInit {
  @Input()
  public avatarImgPath: string;

  constructor() {
    this.avatarImgPath = `https://avatars.dicebear.com/api/personas/${Math.random()}.svg`;
  }

  public get avatarStyles() {
    return {
      "background-image": `url(${this.avatarImgPath})`
    };
  }

  public ngOnInit(): void {
  }
}
