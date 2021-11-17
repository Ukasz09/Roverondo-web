import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "pressureUnit"
})
export class PressureUnitPipe implements PipeTransform {
  private readonly unitsMap = new Map([
    [PressureTransformType.pascalsToHectoPascals, (v: number) => v / 100]
  ]);

  public transform(value: number, type = PressureTransformType.pascalsToHectoPascals): number {
    const calcFunc = this.unitsMap.get(type);
    return calcFunc ? calcFunc(value) : value;
  }
}

export enum PressureTransformType {
  pascalsToHectoPascals
}
