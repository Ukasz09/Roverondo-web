import { Injectable } from "@angular/core";
import { Adapter } from "@app/core/services";
import { UserExtended } from "@app/core/models";
import { Utils } from "@app/shared/utils";

@Injectable({
  providedIn: "root"
})
export class UserAllTimeStatisticsAdapterService implements Adapter<UserExtended> {

  public adapt(item: any): UserExtended {
    item.allTimeStatistics = {
      totalReceivedReactions: Utils.randomNumber(0, 18).toFixed(),
      timeInMotion: Utils.randomNumber(3600, 360000).toFixed(),
      followers: Utils.randomNumber(0, 4).toFixed(),
      followings: Utils.randomNumber(0, 10).toFixed(),
      totalGivenReactions: Utils.randomNumber(0, 40).toFixed(),
      totalDistanceTravelled: Utils.randomNumber(1500, 2500000).toFixed()
    };
    return item;
  }
}
