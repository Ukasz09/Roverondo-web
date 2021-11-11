import { Component, Inject, OnInit } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ActivitiesService, CurrentUserService, SnackbarInfoService } from "@app/core/services";
import { PostComment, PostExtended, Reaction, User } from "@app/core/models";
import { NgModel } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { map, switchMap } from "rxjs/operators";
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
  public alreadyReactedMap: Map<number, Reaction | undefined> = new Map<number, Reaction | undefined>();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { post: PostExtended, withFocus: boolean },
    private readonly activitiesService: ActivitiesService,
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
          this.showSpinner = false;
        } else {
          this.showSpinner = false;
          console.error("Current user not found - comment not added");
        }
      });
    }
  }

  public navigateToProfile(userId: string | number): void {
    this.router.navigate([this.getUserProfileLink(userId)]).then();
    this._bottomSheetRef.dismiss();
  }

  public getUserProfileLink(userId: string | number): string {
    return `/${AppRoutes.user}/${UserRoutes.profile}/${userId?.toString()}`;
  }

  public commentAlreadyReacted(commentId: number): boolean {
    return !!this.alreadyReactedMap.get(commentId);
  }

  public onCommentReactionClick(commentId: number): void {
    if (this.commentAlreadyReacted(commentId)) {
      const userReaction = this.alreadyReactedMap.get(commentId);
      if (userReaction) {
        this.removeReactionFromComment(commentId, userReaction.id);
      } else {
        console.error(`Not found reaction in map for comment with id=${commentId}`);
      }
      return;
    }
    this.addReactionToComment(commentId);
  }

  private removeReactionFromComment(commentId: number, reactionId: number): void {
    this.activitiesService.removeReactionFromComment$(reactionId).subscribe(() => {
      this.alreadyReactedMap.set(commentId, undefined);
      const comment = this.commentList.find(c => c.id === commentId);
      if (comment) {
        comment.reactions--;
        if (comment.reactions < 0) {
          comment.reactions = 0;
        }
      }
      this.msgInfoService.openTextSnackbar("Reaction removed from comment", "OK");
    });
  }

  private addReactionToComment(commentId: number): void {
    this.currentUserService.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.activitiesService.addReactionToComment$(user.id, commentId);
        }
        return throwError("Current user not found");
      })
    ).subscribe(() => {
      this.alreadyReactedCommentData$(commentId).subscribe(
        reaction => {
          this.alreadyReactedMap.set(commentId, reaction);
          const comment = this.commentList.find(c => c.id === commentId);
          if (comment) {
            comment.reactions++;
          }
          this.msgInfoService.openTextSnackbar("Reaction added to comment", "OK");
        }
      );
    });
  }

  private fetchComments(): void {
    this.activitiesService.getComments$(this.data.post.id.toString()).subscribe(comments => {
      this.commentList = comments;
      this.sortComments();
      this.showSpinner = false;

      for (const c of comments) {
        this.alreadyReactedCommentData$(c.id).subscribe(reaction => {
          this.alreadyReactedMap.set(c.id, reaction);
        });
      }
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
    this.activitiesService.addComment(user.id, this.data.post.id.toString(), this.newCommentValue.trim()).subscribe(() => {
      if (!this.commentList) {
        this.commentList = [];
      }
      this.commentList.push(this.getNewComment(user));
      this.data.post.commentsCount++;
      this.sortComments();
      this.newCommentValue = "";
      this.msgInfoService.openTextSnackbar("Comment has been added", "OK");
    });
  }

  private getNewComment(user: User): PostComment {
    const createDate = new Date().toISOString();
    return {
      id: 0, // TODO: fix - must be returned from backend
      text: this.newCommentValue,
      createdAt: createDate,
      modifiedAt: createDate,
      user: {
        id: user.id,
        nickname: user.nickname,
        profilePicture: user.profilePicture
      },
      reactions: 0
    };
  }

  private alreadyReactedCommentData$(commentId: number): Observable<Reaction | undefined> {
    return this.currentUserService.currentUser$.pipe(
      switchMap(user => {
        if (user) {
          return this.activitiesService
            .getCommentsReactions(commentId)
            .pipe(map(reactions => reactions.find(r => r.user.id === user.id)));
        }
        return throwError("Not found current user");
      })
    );
  }
}
