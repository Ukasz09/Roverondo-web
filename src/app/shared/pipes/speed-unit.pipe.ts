import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "speedUnit"
})
export class SpeedUnitPipe implements PipeTransform {
  private readonly unitsMap = new Map([
    [SpeedUnitTransformType.metersPerSecToKilometersPerHour, (v: number) => v * 3.6]
  ]);

  public transform(value: number, type = SpeedUnitTransformType.metersPerSecToKilometersPerHour): number {
    const calcFunc = this.unitsMap.get(type);
    return calcFunc ? calcFunc(value) : value;
  }
}

export enum SpeedUnitTransformType {
  metersPerSecToKilometersPerHour
}
