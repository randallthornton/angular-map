import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  constructor(private http: HttpClient) {}

  getLocations() {
    return this.http.get<Location[]>('/api/locations');
  }

  createLocation(location: any) {
    return this.http.post('/api/locations', location);
  }

  deleteLocation(id: number) {
    return this.http.delete(`/api/locations/${id}`);
  }
}
