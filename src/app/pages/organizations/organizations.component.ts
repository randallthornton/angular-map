import { Component, WritableSignal, signal } from '@angular/core';
import { Organization } from '../../models/organization';
import { OrganizationsService } from '../../organizations.service';
import { FormBuilder, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss',
})
export class OrganizationsComponent {
  organizations: WritableSignal<Organization[]> = signal([]);
  createForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private organizationsService: OrganizationsService,
    private fb: FormBuilder
  ) {
    this.organizationsService.getOrganizations().subscribe((data) => {
      this.organizations.set(data);
    });
  }

  onAddOrganizationClicked() {
    if (this.createForm.invalid) {
      return;
    }

    this.organizationsService
      .createOrganization({
        name: this.createForm.value.name!,
      })
      .pipe(
        switchMap(() => this.organizationsService.getOrganizations()),
        tap((data) => {
          this.organizations.set(data);
        })
      )
      .subscribe();
  }

  onRemoveOrganizationClicked(org: Organization) {}
}
