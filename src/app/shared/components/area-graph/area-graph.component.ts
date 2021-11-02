import { Component, Input, OnInit } from "@angular/core";
import { PlotData } from "@app/core/models";
import { Color } from "@swimlane/ngx-charts";

@Component({
  selector: "app-area-graph",
  templateUrl: "./area-graph.component.html",
  styleUrls: ["./area-graph.component.scss"]
})
export class AreaGraphComponent implements OnInit {
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
  @Input() public withGradient=true;

  public withLegend!: boolean;
  public animations = true;

  constructor() {
  }

  public ngOnInit(): void {
    this.withLegend = this.isMultiGraph;
  }

  public get isMultiGraph(): boolean {
    return false;
  }

  public get dataLoaded(): boolean {
    return !!(this.data && this.data.length > 0);
  }
}
