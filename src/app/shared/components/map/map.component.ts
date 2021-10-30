import { Component, Input, OnInit } from "@angular/core";
import { latLng, tileLayer, Map, MapOptions, LatLng } from "leaflet";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input()
  public latLang: LatLng = latLng(51.107883, 17.038538);

  @Input()
  public zoom = 15;

  @Input()
  public disabledInteractions = true;

  public mapOptions!: MapOptions;

  private readonly tileProvider = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  private readonly initialLayer = tileLayer(this.tileProvider, {
    maxZoom: 20,
    attribution: "Roverondo"
  });

  constructor() {
  }

  public ngOnInit(): void {
    const extraOptions = this.disabledInteractions ? this.disabledMapOptions() : {};
    this.mapOptions = Object.assign({
      layers: [this.initialLayer],
      zoom: this.zoom,
      center: this.latLang
    }, extraOptions);
  }

  public onMapReady(map: Map): void {
    setTimeout(() => {
      map.invalidateSize();
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
}
