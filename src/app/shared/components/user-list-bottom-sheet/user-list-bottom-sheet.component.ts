import { Component, Inject, Input, OnInit, TemplateRef } from "@angular/core";
import { Reaction, User, UserBottomSheet } from "@app/core/models";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { PostsService } from "@app/core/services";
import { Router } from "@angular/router";
import { AppRoutes, UserRoutes } from "@app/core/enums";

@Component({
  selector: "app-user-list-bottom-sheet",
  templateUrl: "./user-list-bottom-sheet.component.html",
  styleUrls: ["./user-list-bottom-sheet.component.scss"]
})
export class UserListBottomSheetComponent implements OnInit {
  @Input() public userList?: UserBottomSheet[] = undefined;
  @Input() public usersNotFoundText = "Users not found";
  @Input() public templateRef?: TemplateRef<any>;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { postId: string },
    private readonly postsService: PostsService,
    private readonly _bottomSheetRef: MatBottomSheetRef<UserListBottomSheetComponent>,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
  }

  public navigateToProfile(userId: string | number): void {
    this.router.navigate([this.getUserProfileLink(userId)]).then();
    this._bottomSheetRef.dismiss();
  }

  public getUserProfileLink(userId: string | number): string {
    return `/${AppRoutes.user}/${UserRoutes.profile}/${userId?.toString()}`;
  }
}
