import { Selector } from "testcafe";

export class WallAllActivities {
  public static readonly activityCards = Selector(".activity-card");
  public static readonly descriptionContainer = Selector(".description");
  public static readonly graphPlot = Selector(".graph-plot");
  public static readonly scrollContainer = Selector(".scroll-container");

  public static getAddReactionBtn(card: Selector): Selector {
    return card.find(".bottom #like");
  }

  public static alreadyReactedToPost(card: Selector): Promise<boolean> {
    return WallAllActivities.getAddReactionBtn(card).hasClass("liked");
  }

  public static getActivityTitle(card: Selector): Selector {
    return card.find(".trip-title span");
  }
}
