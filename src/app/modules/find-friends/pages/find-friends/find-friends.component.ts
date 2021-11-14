import { Component, OnInit } from "@angular/core";
import { User } from "@app/core/models";
import { UsersService } from "@app/core/services";
import { NgModel } from "@angular/forms";
import { Subscription, timer } from "rxjs";

@Component({
  selector: "app-find-friends",
  templateUrl: "./find-friends.component.html",
  styleUrls: ["./find-friends.component.scss"]
})
export class FindFriendsComponent implements OnInit {
  public userList?: User[];
  public searchQuery = "";
  public showSpinner = false;

  private readonly onTypeSearchRequestTimer = 150;
  private onTypeSearchRequestSubscription$?: Subscription;

  constructor(private readonly usersService: UsersService) {
  }

  public ngOnInit(): void {
    this.onTypeSearchRequestSubscription$?.unsubscribe();
  }

  public onModelChange(queryModel: NgModel): void {
    this.onTypeSearchRequestSubscription$?.unsubscribe();
    this.userList = [];
    this.onTypeSearchRequestSubscription$ = timer(this.onTypeSearchRequestTimer).subscribe(() => this.onSubmit(queryModel));
  }

  public onSubmit(queryModel: NgModel): void {
    if (this.queryIsValid(queryModel)) {
      this.showSpinner = true;
      // this.usersService.searchUsers$(this.searchQuery).subscribe((userList) => {
      this.usersService.getUsers$().subscribe((userList) => {
        // this.userList = userList;
        this.userList = userList.concat(userList);
      });
    }
  }

  public queryIsValid(queryModel: NgModel): boolean {
    return !!(queryModel.valid && this.searchQuery?.trim());
  }
}
