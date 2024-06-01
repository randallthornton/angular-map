import {
  Component,
  OnInit,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import L from 'leaflet';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss',
})
export class LeafletMapComponent implements OnInit {
  map?: L.Map;
  locations: WritableSignal<Location[]> = signal([]);

  constructor(
    private navigator: Navigator,
    private locationsService: LocationsService
  ) {
    effect(() => {
      this.locations().forEach((location) => {
        L.marker([location.latitude, location.longitude])
          .addTo(this.map!)
          .bindPopup(location.name);
      });
    });
  }

  ngOnInit(): void {
    new Promise<GeolocationPosition>((resolve, reject) => {
      this.navigator.geolocation.getCurrentPosition(resolve, reject);
    })
      .then((data) => {
        this.initMap(data.coords.latitude, data.coords.longitude);
      })
      .catch((error) => {
        console.error(error);
        this.initMap(51.505, -0.09);
      });

    this.locationsService.getLocations().subscribe((data) => {
      this.locations.set(data);
    });
  }

  initMap(lat: number, lon: number) {
    this.map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }
}
