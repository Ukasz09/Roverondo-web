import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "msToKmh"
})
export class MsToKmhPipe implements PipeTransform {
  public transform(mPerSec: number): number {
    return mPerSec * 3.6;
  }
}
