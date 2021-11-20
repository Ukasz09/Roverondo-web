import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Gender, PlotData, UserExtended, UserPlotData } from "@app/core/models";
import { ActivitiesRoutes, AppRoutes, PlotColors, SpinnerType, TimeRange, UserRoutes } from "@app/core/enums";
import { NgxSpinnerService } from "ngx-spinner";
import { CurrentUserService, UsersService } from "@app/core/services";
import { TimeTransformType, TimeUnitPipe } from "@app/shared/pipes";
import { Color } from "@swimlane/ngx-charts";
import { timer, zip } from "rxjs";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  public readonly Gender = Gender;
  public readonly elevationColorScheme = { domain: [PlotColors.elevation] } as Color;
  public readonly speedColorScheme = { domain: [PlotColors.speed] } as Color;
  public readonly distanceColorScheme = { domain: [PlotColors.distance] } as Color;
  public readonly activitiesColorScheme = { domain: [PlotColors.activities] } as Color;

  public user!: UserExtended;
  public alreadyFollowed = false;
  public monthlyPlotData?: UserPlotData;
  public weeklyPlotData?: UserPlotData;
  public minAvgSpeed = 0;
  public minElevation = 0;

  constructor(
    public readonly currentUserService: CurrentUserService,
    public readonly usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router,
    private readonly timeUnitPipe: TimeUnitPipe
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.user = data.user;
      this.spinner.hide(SpinnerType.main).then();
    });
    // Workaround for lib bug
    timer(250).subscribe(() => this.fetchPlotData());
  }

  public onFollowClick(): void {
    this.alreadyFollowed = !this.alreadyFollowed;
    // TODO: add logic
  }

  public navigateToActivities(): void {
    this.navigateWithSpinner(`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.completed}`);
  }

  public navigateToPlannedRoutes(): void {
    this.navigateWithSpinner(`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.planned}`);
  }

  public navigateToEvents(): void {
    this.navigateWithSpinner(`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.events}`);
  }

  public navigateToLiked(): void {
    this.navigateWithSpinner(`/${AppRoutes.activities}/${this.user.id}/${ActivitiesRoutes.liked}`);
  }

  public navigateToFollowers(): void {
    this.navigateWithSpinner(`/${AppRoutes.user}/${this.user.id}/${UserRoutes.followers}`);
  }

  public navigateToFollowings(): void {
    this.navigateWithSpinner(`/${AppRoutes.user}/${this.user.id}/${UserRoutes.followings}`);
  }

  public get userWeightText(): string {
    if (this.user.weight) {
      return `${this.user.weight}kg`;
    }
    return "Not specified";
  }

  public get userGenderIcon(): string {
    switch (this.user.gender) {
      case Gender.male:
        return "male";
      case Gender.female:
        return "female";
      default:
        return "transgender";
    }
  }

  public get timeInMotionText(): string {
    const hours = this.timeUnitPipe.transform(this.user.allTimeStatistics.timeInMotion, TimeTransformType.secondsToHours);
    const hoursInt = Math.trunc(hours);
    const hoursRest = hours - hoursInt;
    const minutes = this.timeUnitPipe.transform(hoursRest, TimeTransformType.hoursToMinutes);
    return `${hoursInt}:${minutes.toFixed()}h`;
  }

  public getPlotData(timeRangeType: TimeRange): UserPlotData {
    const plotData = timeRangeType === TimeRange.monthly ? this.monthlyPlotData : this.weeklyPlotData;
    return plotData as UserPlotData;
  }

  private navigateWithSpinner(route: string): void {
    this.router.navigate([route]).then();
    this.spinner.show(SpinnerType.main).then();
  }

  private fetchPlotData(): void {
    zip(
      this.usersService.plotSummarizedData(this.user.id, TimeRange.monthly),
      this.usersService.plotSummarizedData(this.user.id, TimeRange.weekly)
    ).subscribe(([monthly, weekly]) => {
      this.monthlyPlotData = monthly;
      this.weeklyPlotData = weekly;
      this.minAvgSpeed = this.getMinAvgSpeed(monthly);
      this.minElevation = this.getMinElevation(monthly);
    });
  }

  private getMinAvgSpeed(plotData: UserPlotData): number {
    const speedValues = plotData.averageSpeed.map(plotData => plotData.value);
    let minAvgSpeed = Math.min(...speedValues) - 1;
    if (minAvgSpeed < 0) {
      minAvgSpeed = 0;
    }
    return minAvgSpeed;
  }

  private getMinElevation(plotData: UserPlotData): number {
    const elevationValues = plotData.elevation.map(plotData => plotData.value);
    return Math.min(...elevationValues) - 1;
  }
}
