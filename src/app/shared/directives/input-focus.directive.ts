import { AfterViewInit, Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[inputFocus]"
})
export class InputFocusDirective implements AfterViewInit {
  @Input("inputFocus") public focused: boolean = false;

  constructor(public element: ElementRef<HTMLElement>) {
  }

  public ngAfterViewInit(): void {
    if (this.focused) {
      setTimeout(() => this.element.nativeElement.focus(), 0);
    }
  }
}
