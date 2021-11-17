import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "lengthUnit"
})
export class LengthUnitPipe implements PipeTransform {
  private readonly unitsMap = new Map([
    [LengthTransformType.metersToKilometers, (v: number) => v / 1000]
  ]);

  public transform(value: number, type = LengthTransformType.metersToKilometers): number {
    const calcFunc = this.unitsMap.get(type);
    return calcFunc ? calcFunc(value) : value;
  }
}

export enum LengthTransformType {
  metersToKilometers
}
