import { Component, WritableSignal, signal } from '@angular/core';
import { LocationsService } from '../../services/locations.service';
import { Location } from '../../models/location';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent {
  locations: WritableSignal<Location[]> = signal([]);
  createLocationForm = this.fb.group({
    name: ['', Validators.required],
    latitude: [0, Validators.required],
    longitude: [0, Validators.required],
  });

  constructor(
    private locationsService: LocationsService,
    private fb: FormBuilder,
    private navigator: Navigator
  ) {
    this.locationsService.getLocations().subscribe((data) => {
      this.locations.set(data);
    });
  }

  onAddLocationClicked() {
    if (this.createLocationForm.invalid) {
      return;
    }

    this.locationsService
      .createLocation({
        name: this.createLocationForm.value.name!,
        latitude: +this.createLocationForm.value.latitude!,
        longitude: +this.createLocationForm.value.longitude!,
      })
      .subscribe(() => {
        this.locationsService.getLocations().subscribe((data) => {
          this.locations.set(data);
        });
      });
  }

  async onUseMyLocationClicked() {
    const data = await new Promise<GeolocationPosition>((resolve, reject) => {
      this.navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    this.createLocationForm.patchValue({
      latitude: data.coords.latitude,
      longitude: data.coords.longitude,
    });
  }
}
