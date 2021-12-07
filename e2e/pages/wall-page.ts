import { Selector } from "testcafe";

export class WallPage {
  public static readonly activityCards = Selector(".activity-card");
  public static readonly descriptionContainer = Selector(".description");
  public static readonly speedChart = Selector("#speed-graph");
  public static readonly elevationChart = Selector("#elevation-graph");
  public static readonly scrollContainer = Selector(".scroll-container");
  public static readonly reactionsCountLabel = Selector("#reactions-count");
  public static readonly reactionsList = Selector("#like-stat");
  public static readonly overlayWrapper = Selector(".cdk-global-overlay-wrapper");

  public static readonly activityStartTimeStat = Selector("#activity-start-time-stat");
  public static readonly activityEndTimeStat = Selector("#activity-end-time-stat");
  public static readonly maxAltitudeStat = Selector("#max-altitude-stat");
  public static readonly minAltitudeStat = Selector("#min-altitude-stat");
  public static readonly avgAltitudeStat = Selector("#avg-altitude-stat");
  public static readonly caloriesStat = Selector("#calories-stat");
  public static readonly elevationStat = Selector("#elevation-stat");
  public static readonly maxSpeedStat = Selector("#max-speed-stat");
  public static readonly speedStat = Selector("#speed-stat");
  public static readonly distanceStat = Selector("#distance-stat");
  public static readonly durationStat = Selector("#duration-stat");
  public static readonly locationStat = Selector("#location-stat");

  public static getUserBottomSheetBtnList(userId: string | number): Selector {
    const selectorId = `#btn-${userId}`;
    return Selector(selectorId);
  }

  public static getAddReactionBtn(card: Selector): Selector {
    return card.find(".bottom #like");
  }

  public static getActivityTitle(card: Selector): Selector {
    return card.find(".trip-title span");
  }
}
