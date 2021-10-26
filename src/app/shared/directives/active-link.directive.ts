import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { RoutesService } from "@app/core/services";
import { Subscription } from "rxjs";

@Directive({
  selector: "[appActiveLink]"
})
export class ActiveLinkDirective implements OnInit, OnDestroy {
  @Input() public appActiveLink = "";

  private routeChange$?: Subscription;

  constructor(private elementRef: ElementRef, private routesService: RoutesService) {
  }

  public ngOnInit(): void {
    this.decorateLink(this.getActiveRoute());
    this.routeChange$ = this.routesService.routeChange.subscribe({
      next: route => {
        this.decorateLink(route);
      }
    });
  }

  public ngOnDestroy(): void {
    this.routeChange$?.unsubscribe();
  }

  private decorateLink(route: string): void {
    if (this.appActiveLink === route) {
      this.changeLinkToActive();
    } else {
      this.changeLinkToNotActive()
    }
  }

  private getActiveRoute(): string {
    return this.routesService.getActualRoute() ?? "";
  }

  private changeLinkToActive(): void {
    this.elementRef.nativeElement.style.color = "#343a40";
    this.elementRef.nativeElement.style.fontWeight = 600;
  }

  private changeLinkToNotActive(): void {
    this.elementRef.nativeElement.style.color = "#5b5b5b";
    this.elementRef.nativeElement.style.fontWeight = 500;
  }
}
