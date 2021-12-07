import { Component, OnInit } from "@angular/core";
import { User, UserExtended } from "@app/core/models";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SpinnerType } from "@app/core/enums";
import { LeaderboardService } from "@app/core/services";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.scss"]
})
export class LeaderboardComponent implements OnInit {
  public userList?: UserExtended[];

  constructor(
    private readonly router: Router,
    private readonly leaderboardService: LeaderboardService,
    private readonly spinner: NgxSpinnerService
  ) {
  }

  public ngOnInit(): void {
    this.spinner.show(SpinnerType.main).then();
    this.fetchUsers();
  }

  public fetchUsers(): void {
    this.leaderboardService.getUsersLeaderboard$().subscribe((users) => {
      this.userList = users;
      this.userList = this.userList.sort((a, b) => {
        return b.allTimeStatistics.totalDistanceTravelled - a.allTimeStatistics.totalDistanceTravelled;
      });
      this.spinner.hide(SpinnerType.main).then();
    });
  }
}
