import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Directive({
  selector: "[appActiveLink]"
})
export class ActiveLinkDirective implements OnInit {
  @Input() appActiveLink = "";

  constructor(private elementRef: ElementRef, private route: ActivatedRoute) {
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
    return this.route.snapshot.url[0].path;
  }

  private changeLinkToActive(): void {
    this.elementRef.nativeElement.style.color = "#343a40";
    this.elementRef.nativeElement.style.fontWeight = 600;
  }
}
