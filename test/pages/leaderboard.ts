import { Selector } from "testcafe";

export class Leaderboard {
  public static readonly userCard = Selector("app-user-card");

  public static getGoldMedal(userCard: Selector): Selector {
    return userCard.find("img[src='/assets/icons/medal-1.png']");
  }

  public static getSilverMedal(userCard: Selector): Selector {
    return userCard.find("img[src='/assets/icons/medal-2.png']");
  }

  public static getBronzeMedal(userCard: Selector): Selector {
    return userCard.find("img[src='/assets/icons/medal-3.png']");
  }
}
