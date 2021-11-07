import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-profile-avatar",
  templateUrl: "./profile-avatar.component.html",
  styleUrls: ["./profile-avatar.component.scss"]
})
export class ProfileAvatarComponent implements OnInit {
  @Input() public avatarImgPath?: string;
  @Input() public nickname?: string;
  @Input() public fadeIn = true;

  constructor() {
  }

  public get avatarStyles() {
    return {
      "background-image": `url(${this.avatarImgPath})`
    };
  }

  public ngOnInit(): void {
    if (!this.avatarImgPath) {
      let processedNickname = this.nickname ? this.nickname.split(" ").join("%20").trim() : "?";
      this.avatarImgPath = `https://avatars.dicebear.com/api/initials/${processedNickname}.svg`;
    }
  }
}
