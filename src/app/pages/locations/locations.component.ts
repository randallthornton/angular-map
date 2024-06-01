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
    latitude: ['', Validators.required],
    longitude: ['', Validators.required],
  });

  constructor(
    private locationsService: LocationsService,
    private fb: FormBuilder
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
      })
      .subscribe(() => {
        this.locationsService.getLocations().subscribe((data) => {
          this.locations.set(data);
        });
      });
  }
}
