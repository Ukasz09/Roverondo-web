import { Component, OnInit } from "@angular/core";
import { User } from "@app/core/models";

@Component({
  selector: "app-find-friends",
  templateUrl: "./find-friends.component.html",
  styleUrls: ["./find-friends.component.scss"]
})
export class FindFriendsComponent implements OnInit {
  public userList: User[] = [];

  constructor() {
  }

  public ngOnInit(): void {
  }

}
