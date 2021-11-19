import { Component, Input, OnInit } from "@angular/core";
import { PlotData } from "@app/core/models";
import { Color } from "@swimlane/ngx-charts";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-vertical-bar-graph",
  templateUrl: "./vertical-bar-graph.component.html",
  styleUrls: ["./vertical-bar-graph.component.scss"]
})
export class VerticalBarGraphComponent implements OnInit {
  @Input() public data?: PlotData[];
  @Input() public id!: string;
  @Input() public label!: string;
  @Input() public showYAxisLabel = false;
  @Input() public showXAxisLabel = false;
  @Input() public xAxisLabel = "x";
  @Input() public yAxisLabel = "y";
  @Input() public xAxis = true;
  @Input() public yAxis = true;
  @Input() public colorScheme: Color | string = "natural";
  @Input() public withGradient = false;
  @Input() public yScaleMin?: number;
  @Input() public withLegend = false;
  @Input() public displayedLabelIndexes?: number[];
  public animations = true;
  public axisFormatBind?: any;

  constructor() {
  }

  public ngOnInit(): void {
    this.axisFormatBind = this.xAxisFormat.bind(this);
  }

  public get dataLoaded(): boolean {
    return !!(this.data && this.data.length > 0);
  }

  public xAxisFormat(x: string): string {
    if (!this.displayedLabelIndexes) {
      return this.formatXLabel(x);
    }

    if (this.data) {
      for (const index of this.displayedLabelIndexes) {
        if(this.data.length>=index){
          const xName = this.data[index].name;
          if (x === xName) {
            return this.formatXLabel(xName);
          }
        }
      }
    }
    return "";
  }

  private formatXLabel(xName: string): string {
    const dateCleaned = xName.split(";")[0];
    return new DatePipe("en-US").transform(dateCleaned, "MMMM yyyy") ?? "";
  }
}
