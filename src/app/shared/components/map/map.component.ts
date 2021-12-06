import { Component, Input, OnInit } from "@angular/core";
import { latLng, tileLayer, Map, MapOptions, LatLng, Layer, polyline, LatLngBounds } from "leaflet";
import { Point as DataPoint } from "@app/core/models";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input() public zoom = 10;
  @Input() public disabledInteractions = true;
  @Input() public routePoints: DataPoint[] = [];

  public mapOptions!: MapOptions;
  public fitBounds!: LatLngBounds;
  public routeLayers: Layer[] = [];

  private readonly polylineColor = "#d50000";
  private readonly polylineBorderColor = "#fff";
  private readonly tileProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  private readonly initialLayer = tileLayer(this.tileProvider, {
    maxZoom: 20,
    attribution: "Roverondo"
  });
  private readonly defaultCenterLatLng = latLng(53.107883, 22.038538);

  constructor() {
  }

  public ngOnInit(): void {
    const extraOptions = this.disabledInteractions ? this.disabledMapOptions() : {};
    this.mapOptions = Object.assign({
      layers: [this.initialLayer],
      zoom: this.zoom,
      center: this.defaultCenterLatLng
    }, extraOptions);
    setTimeout(() => {
      this.addRouteLayer();
    }, 200);
  }

  public onMapReady(map: Map): void {
    setTimeout(() => {
      map.invalidateSize({ animate: true });
    }, 0);
  }

  private disabledMapOptions(): Partial<MapOptions> {
    return {
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false
    };
  }

  private addRouteLayer(): void {
    if (this.routePoints.length > 0) {
      const latLangExpression = [];
      for (const point of this.routePoints) {
        latLangExpression.push(new LatLng(point.latitude, point.longitude, point.elevation));
      }
      const lineBorder = polyline(latLangExpression, { color: this.polylineBorderColor, weight: 9, opacity: 0.9 });
      const line = polyline(latLangExpression, { color: this.polylineColor, weight: 4, opacity: 1 });
      this.routeLayers.push(lineBorder);
      this.routeLayers.push(line);
      this.fitBounds = line.getBounds();
    }
  }
}
