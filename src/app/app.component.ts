import { Component, WritableSignal, signal } from '@angular/core';
import { OrganizationsService } from './organizations.service';
import { Organization } from './models/organization';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  organizations: WritableSignal<Organization[]> = signal([]);

  constructor(private organizationsService: OrganizationsService) {
    this.organizationsService.getOrganizations().subscribe((data) => {
      this.organizations.set(data);
    });
  }

  onOrgSelected(org: MatSelectChange) {
    this.organizationsService.selectedOrganization.set(org.value);
  }
}
