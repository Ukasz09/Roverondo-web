import { Component, Input, OnInit } from "@angular/core";
import { AreaPlotData } from "@app/core/models";
import { Color, LegendPosition } from "@swimlane/ngx-charts";

@Component({
  selector: "app-area-graph",
  templateUrl: "./area-graph.component.html",
  styleUrls: ["./area-graph.component.scss"]
})
export class AreaGraphComponent implements OnInit {
  @Input() public data?: AreaPlotData[];
  @Input() public id!: string;
  @Input() public label!: string;
  @Input() public showYAxisLabel = false;
  @Input() public showXAxisLabel = false;
  @Input() public xAxisLabel = "x";
  @Input() public yAxisLabel = "y";
  @Input() public xAxis = false;
  @Input() public yAxis = true;
  @Input() public colorScheme: Color | string = "natural";
  @Input() public withGradient = false;
  @Input() public yScaleMin?: number;
  @Input() public withLegend = false;
  @Input() public xAxisFormat: (x: string) => string = x => x;

  public readonly LegendPosition = LegendPosition;

  public animations = true;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public get dataLoaded(): boolean {
    return !!(this.data && this.data.length > 0);
  }
}
