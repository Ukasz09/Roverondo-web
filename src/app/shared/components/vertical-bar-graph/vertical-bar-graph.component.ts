import { Component, Input, OnInit } from "@angular/core";
import { PlotData } from "@app/core/models";
import { Color } from "@swimlane/ngx-charts";

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
  @Input() public xAxisFormat: (x: string) => string = x => x;
  @Input() public barPadding = 2;

  public animations = true;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public get dataLoaded(): boolean {
    return !!(this.data && this.data.length > 0);
  }
}
