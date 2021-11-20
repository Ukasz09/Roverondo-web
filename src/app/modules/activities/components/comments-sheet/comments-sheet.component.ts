import { Component, Inject, OnInit } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { CurrentUserService, SnackbarInfoService, PostsService } from "@app/core/services";
import { PostComment, PostExtended, User } from "@app/core/models";
import { NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { switchMap } from "rxjs/operators";
import { AppRoutes, UserRoutes } from "@app/core/enums";

@Component({
  selector: "app-comments-sheet",
  templateUrl: "./comments-sheet.component.html",
  styleUrls: ["./comments-sheet.component.scss"]
})
export class CommentsSheetComponent implements OnInit {
  public commentList: PostComment[] = [];
  public newCommentValue = "";
  public showSpinner = true;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { post: PostExtended, withFocus: boolean },
    private readonly postsService: PostsService,
    private readonly _bottomSheetRef: MatBottomSheetRef<CommentsSheetComponent>,
    private readonly router: Router,
    private readonly currentUserService: CurrentUserService,
    public readonly msgInfoService: SnackbarInfoService
  ) {
  }

  public ngOnInit(): void {
    this.fetchComments();
  }

  public onSubmit(commentModel: NgModel): void {
    if (commentModel.valid && this.newCommentValue?.trim()) {
      this.showSpinner = true;
      this.currentUserService.currentUser$.subscribe((user) => {
        if (user) {
          this.addComment(user);
        } else {
          console.error("Current user not found - comment not added");
        }
        this.showSpinner = false;
      });
    }
  }

  public navigateToProfile(userId: string | number): void {
    this.router.navigate([`/${AppRoutes.user}/${userId}/${UserRoutes.profile}`]).then();
    this.dismissSheet();
  }

  public dismissSheet(): void {
    this._bottomSheetRef.dismiss();
  }

  public onCommentReactionClick(comment: PostComment): void {
    if (comment.alreadyReactedTo) {
      this.postsService.getCommentsReactions$(comment.id).subscribe(reactions => {
        this.currentUserService.currentUser$.subscribe(u => {
          const userReaction = reactions.find(r => r.user.id === u?.id);
          if (userReaction) {
            this.removeReactionFromComment(comment, userReaction.id);
          } else {
            console.error(`Not found reaction in map for comment with id=${comment.id}`);
          }
        });
      });
    } else {
      this.addReactionToComment(comment);
    }
  }

  private removeReactionFromComment(comment: PostComment, reactionId: number): void {
    this.postsService.removeReactionFromComment$(reactionId).subscribe(() => {
      comment.reactions--;
      comment.alreadyReactedTo = false;
      if (comment.reactions < 0) {
        comment.reactions = 0;
      }
      this.msgInfoService.openTextSnackbar("Reaction removed from comment", "OK");
    });
  }

  private addReactionToComment(comment: PostComment): void {
    this.currentUserService.currentUser$.pipe(switchMap(user => {
        if (user) {
          return this.postsService.addReactionToComment$(user.id, comment.id);
        }
        return throwError("Current user not found");
      })
    ).subscribe(() => {
      comment.reactions++;
      comment.alreadyReactedTo = true;
      this.msgInfoService.openTextSnackbar("Reaction added to comment", "OK");
    });
  }

  private fetchComments(): void {
    this.postsService.getComments$(this.data.post.id.toString()).subscribe(comments => {
      this.commentList = comments;
      this.sortComments();
      this.showSpinner = false;
    });
  }

  private sortComments(): void {
    if (this.commentList) {
      this.commentList.sort((c1, c2) => {
        const c1Date = new Date(Date.parse(c1.createdAt));
        const c2Date = new Date(Date.parse(c2.createdAt));
        return c2Date.getTime() - c1Date.getTime();
      });
    }
  }

  private addComment(user: User): void {
    this.postsService.addComment$(user.id, this.data.post.id.toString(), this.newCommentValue.trim()).subscribe((comment) => {
      if (!this.commentList) {
        this.commentList = [];
      }
      this.commentList.push(comment);
      this.data.post.commentsCount++;
      this.sortComments();
      this.newCommentValue = "";
      this.msgInfoService.openTextSnackbar("Comment has been added", "OK");
    });
  }
}
