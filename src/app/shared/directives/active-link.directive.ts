import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { RoutesService } from "@app/core/services";
import { Subscription } from "rxjs";

@Directive({
  selector: "[appActiveLink]"
})
export class ActiveLinkDirective implements OnInit, OnDestroy {
  @Input() public appActiveLink = "";
  @Input() public routeIndex = 0;

  private routeChange$?: Subscription;

  constructor(private readonly elementRef: ElementRef, private readonly routesService: RoutesService) {
  }

  public ngOnInit(): void {
    this.decorateLink(this.routesService.getActualRoute());
    this.routeChange$ = this.routesService.routeChange$.subscribe({
      next: route => {
        this.decorateLink(route);
      }
    });
  }

  public ngOnDestroy(): void {
    this.routeChange$?.unsubscribe();
  }

  private decorateLink(route: string[]): void {
    if (route.length >= this.routeIndex) {
      if (this.appActiveLink === route[this.routeIndex]) {
        this.changeLinkToActive();
      } else {
        this.changeLinkToNotActive();
      }
    }
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
