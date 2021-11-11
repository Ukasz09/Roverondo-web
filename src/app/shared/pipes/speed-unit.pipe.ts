import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "speedUnit"
})
export class SpeedUnitPipe implements PipeTransform {
  public transform(value: number, type = SpeedUnitTransformType.metersPerSecToKilometersPerHour): number {
    if (type === SpeedUnitTransformType.metersPerSecToKilometersPerHour)
      return value * 3.6;
    return value;
  }
}

export enum SpeedUnitTransformType {
  metersPerSecToKilometersPerHour
}
