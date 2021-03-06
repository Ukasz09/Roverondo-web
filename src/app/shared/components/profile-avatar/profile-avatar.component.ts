import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppRoutes, UserRoutes } from "@app/core/enums";

@Component({
  selector: "app-profile-avatar",
  templateUrl: "./profile-avatar.component.html",
  styleUrls: ["./profile-avatar.component.scss"]
})
export class ProfileAvatarComponent implements OnInit {
  @Input() public avatarImgPath?: string;
  @Input() public nickname?: string;
  @Input() public fadeIn = true;
  @Input() public userId!: string | number;

  constructor(private readonly router: Router) {
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

  public navigateToProfile(): void {
    this.router.navigate([`/${AppRoutes.user}/${this.userId}/${UserRoutes.profile}`]).then();
  }
}
