import { Injectable } from "@angular/core";
import { Adapter } from "@app/core/services";
import { PostExtended } from "@app/core/models";

@Injectable({
  providedIn: "root"
})
export class SpeedFixAdapterService implements Adapter<PostExtended> {
  private readonly maxSpeed = 80 / 3.6; // m/s

  public adapt(data: PostExtended): PostExtended {
    data.workout.route.route = data.workout.route.route.filter(p => p.speed && p.speed < this.maxSpeed);
    data.workout.maxSpeed = Math.max(...data.workout.route.route.map(p => p.speed ?? 0));
    return data;
  }
}
