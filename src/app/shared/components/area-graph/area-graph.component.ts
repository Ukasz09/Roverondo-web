import { Component, Input, OnInit } from "@angular/core";
import { PlotData } from "../../../core/models/plot-data";

@Component({
  selector: "app-area-graph",
  templateUrl: "./area-graph.component.html",
  styleUrls: ["./area-graph.component.scss"]
})
export class AreaGraphComponent implements OnInit {
  @Input() public data: PlotData[] = [];
  @Input() public id!: string;
  @Input() public label!: string;
  @Input() public showYAxisLabel = false;
  @Input() public showXAxisLabel = false;
  @Input() public xAxisLabel = "x";
  @Input() public yAxisLabel = "y";
  public withLegend!: boolean;
  public animations = true;
  public xAxis = true;
  public yAxis = true;

  constructor() {
  }

  public ngOnInit(): void {
    this.withLegend = this.isMultiGraph;
  }

  public onSelect(data: any): void {
    console.log(data);
  }

  public get isMultiGraph(): boolean {
    return false;
  }

  public get dataReady(): boolean {
    return this.data.length > 0;
  }
}
