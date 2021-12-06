import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core";
import { ScrollService } from "@app/core/services";

@Component({
  selector: "app-scroll-container",
  templateUrl: "./scroll-container.component.html",
  styleUrls: ["./scroll-container.component.scss"]
})
export class ScrollContainerComponent implements OnInit {
  @Input() public id!: string;
  @Input() public withScrollbar = true;
  @Input() public initialScrollTopOffsetPx = 0;

  @ViewChild("container") scrollContainer!: ElementRef;

  constructor(private readonly scrollService: ScrollService) {
  }

  public ngOnInit(): void {
  }

  public onScroll() {
    const scrollTopPos = this.scrollContainer.nativeElement.scrollTop;
    const scrollHeight = this.scrollContainer.nativeElement.scrollHeight - this.scrollContainer.nativeElement.clientHeight;
    const scrollBottomPos = scrollHeight - scrollTopPos;
    this.scrollService.saveScrollTopPosition(this.id, scrollTopPos);
    this.scrollService.saveScrollBottomPosition(this.id, scrollBottomPos);
  }

  public scrollTop(offset: number): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = offset;
    } else {
      console.warn("Scroll container is null - not scrolled");
    }
  }
}
