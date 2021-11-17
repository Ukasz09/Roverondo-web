import { Injectable } from "@angular/core";
import { Adapter } from "@app/core/services";
import { PostExtended } from "@app/core/models";
import { Utils } from "@app/shared/utils";

@Injectable({
  providedIn: "root"
})
export class MockedSpeedAdapterService implements Adapter<PostExtended> {
  private readonly min = 15 / 3.6;
  private readonly max = 45 / 3.6;

  public adapt(item: PostExtended): PostExtended {
    let y = 0;
    let maxY = y;
    for (const point of item.workout.route.route) {
      let newValue = Utils.randomNumber(this.min, this.max);
      let sign = Math.random() < 0.5 ? -1 : 1;
      newValue *= sign;
      if ((y + newValue) < 0) {
        newValue = this.min;
      }
      y += newValue;
      if (y > maxY) {
        maxY = y;
      }
      point.speed = y;
    }

    if (maxY > this.max) {
      const scale = maxY / this.max;
      for (const point of item.workout.route.route) {
        point.speed = (point.speed ?? 0) / scale;
      }
    }

    return item;
  }
}
