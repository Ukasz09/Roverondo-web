import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "mToKm"
})
export class MToKmPipe implements PipeTransform {
  public transform(meters: number): number {
    return meters / 1000;
  }
}
