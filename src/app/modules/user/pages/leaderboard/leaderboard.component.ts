import { Component, OnInit } from "@angular/core";
import { User } from "@app/core/models";
import { Router } from "@angular/router";
import { UsersService } from "@app/core/services";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.scss"]
})
export class LeaderboardComponent implements OnInit {
  public userList?: User[];

  constructor(
    private readonly router: Router,
    private readonly userService: UsersService
  ) {
  }

  public ngOnInit(): void {
    this.fetchUsers();
  }

  public fetchUsers(): void {
    this.userService.getUsersLeaderboard$().subscribe({
      next: (users) => {
        this.userList = users;
      }
    });
  }
}
