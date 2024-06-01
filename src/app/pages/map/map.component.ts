import { Component } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import * as olProj from 'ol/proj';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  title = 'map';
  map?: Map;

  constructor(private Navigator: Navigator) {}

  ngOnInit() {
    new Promise<GeolocationPosition>((resolve, reject) => {
      this.Navigator.geolocation.getCurrentPosition(resolve, reject);
    })
      .then((data) => {
        this.map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: olProj.fromLonLat([
              data.coords.longitude,
              data.coords.latitude,
            ]),
            zoom: 4,
          }),
        });
      })
      .catch((error) => {
        console.error(error);

        this.map = new Map({
          target: 'map',
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: olProj.fromLonLat([-74.006, 40.7128]),
            zoom: 4,
          }),
        });
      });
  }
}
