import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "timeUnit"
})
export class TimeUnitPipe implements PipeTransform {
  private readonly timeMap = new Map([
    [TimeTransformType.secondsToHours, (v: number) => v / 3600],
    [TimeTransformType.hoursToMinutes, (v: number) => v * 60]
  ]);

  public transform(value: number, type = TimeTransformType.secondsToHours): number {
    const calcFunc = this.timeMap.get(type);
    return calcFunc ? calcFunc(value) : value;
  }
}

export enum TimeTransformType {
  secondsToHours,
  hoursToMinutes
}
