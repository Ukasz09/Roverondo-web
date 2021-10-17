import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-profile-avatar",
  templateUrl: "./profile-avatar.component.html",
  styleUrls: ["./profile-avatar.component.scss"]
})
export class ProfileAvatarComponent implements OnInit {
  @Input()
  public avatarImgPath: string;

  private readonly characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  constructor() {
    this.avatarImgPath = `https://avatars.dicebear.com/api/initials/${this.getRandomLetter()}${this.getRandomLetter()}.svg`;
  }

  public get avatarStyles() {
    return {
      "background-image": `url(${this.avatarImgPath})`,
    };
  }

  public ngOnInit(): void {
  }

  private getRandomLetter(): string {
    return this.characters.charAt(Math.floor(Math.random() * this.characters.length));
  }
}
