import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[stopPropagateClickEvent]"
})
export class StopPropagateClickEventDirective {
  @HostListener("click", ["$event"])
  public onClick(event: Event): void {
    event.stopPropagation();
  }
}
