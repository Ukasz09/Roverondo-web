import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "lengthUnit"
})
export class LengthUnitPipe implements PipeTransform {
  public transform(value: number, type = LengthTransformType.metersToKilometers): number {
    if (type === LengthTransformType.metersToKilometers) {
      return value / 1000;
    }
    return value;
  }
}

export enum LengthTransformType {
  metersToKilometers
}
