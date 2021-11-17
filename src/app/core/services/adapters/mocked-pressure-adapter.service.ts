import { Injectable } from "@angular/core";
import { Adapter } from "@app/core/services";
import { PostExtended } from "@app/core/models";
import { Utils } from "@app/shared/utils";

@Injectable({
  providedIn: "root"
})
export class MockedPressureAdapterService implements Adapter<PostExtended> {
  private readonly minPa = 100000;
  private readonly maxPa = 102000;

  public adapt(item: Partial<PostExtended>): PostExtended {
    const route = item?.workout?.route?.route ?? [];
    for (const point of route) {
      point.pressure = Utils.randomNumber(this.minPa, this.maxPa);
    }
    return item as PostExtended;
  }
}
