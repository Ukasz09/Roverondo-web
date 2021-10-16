import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { RoutesService } from "../../core/services/routes.service";

@Directive({
  selector: "[appActiveLink]"
})
export class ActiveLinkDirective implements OnInit {
  @Input() appActiveLink = "";

  constructor(private elementRef: ElementRef, private routesService: RoutesService) {
  }

  public ngOnInit(): void {
    this.decorateLinkIfNeeded();
  }

  private decorateLinkIfNeeded(): void {
    if (this.appActiveLink === this.getActiveRoute()) {
      this.changeLinkToActive();
    }
  }

  private getActiveRoute(): string {
    return this.routesService.actualRoute ?? "";
  }

  private changeLinkToActive(): void {
    this.elementRef.nativeElement.style.color = "#343a40";
    this.elementRef.nativeElement.style.fontWeight = 600;
  }
}
