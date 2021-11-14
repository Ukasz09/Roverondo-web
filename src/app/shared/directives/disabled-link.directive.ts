import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { RoutesService } from "@app/core/services";
import { Subscription } from "rxjs";

@Directive({
  selector: "[appDisabledLink]"
})
export class DisabledLinkDirective implements OnInit, OnDestroy {
  @Input() public appDisabledLink = "";
  @Input() public appDisabledLinkIndex = 0;
  @Input() public appDisabledTextDecoration = true;

  private routeChange$?: Subscription;

  constructor(private readonly elementRef: ElementRef, private readonly routesService: RoutesService) {
  }

  public ngOnInit(): void {
    this.updateStyles(this.routesService.getActualRoute());
    this.routeChange$ = this.routesService.routeChange$.subscribe({
      next: route => {
        this.updateStyles(route);
      }
    });
  }

  public ngOnDestroy(): void {
    this.routeChange$?.unsubscribe();
  }

  private updateStyles(route: string[]): void {
    if (route.length >= this.appDisabledLinkIndex) {
      if (this.appDisabledLink === route[this.appDisabledLinkIndex]) {
        this.changeLinkToDisabled();
      } else {
        this.resetStyle();
      }
    }
  }

  private resetStyle(): void {
    this.elementRef.nativeElement.style.cursor = "auto";
    this.elementRef.nativeElement.style.opacity = 1;
    this.elementRef.nativeElement.style["text-decoration"] = "initial";
    this.elementRef.nativeElement.style["pointer-events"] = "all";
  }

  private changeLinkToDisabled(): void {
    this.elementRef.nativeElement.style.cursor = "not-allowed !important";
    this.elementRef.nativeElement.style["pointer-events"] = "none";
    if(this.appDisabledTextDecoration){
      this.elementRef.nativeElement.style.opacity = 0.5;
      this.elementRef.nativeElement.style["text-decoration"] = "none";
    }
  }
}
