import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Organization } from './models/organization';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {

  selectedOrganization: WritableSignal<Organization | null> = signal(null);

  constructor(private http: HttpClient) {}

  getOrganizations() {
    return this.http.get<Organization[]>('/api/organizations');
  }

  createOrganization(body: any) {
    return this.http.post<Organization>('/api/organizations', body);
  }
}
