import { Component, WritableSignal, signal } from '@angular/core';
import { Asset } from '../../models/asset';
import { AssetsService } from '../../services/assets.service';
import { switchMap, tap } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { OrganizationsService } from '../../organizations.service';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrl: './assets.component.scss',
})
export class AssetsComponent {
  assets: WritableSignal<Asset[]> = signal([]);
  createAssetForm = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(
    private api: AssetsService,
    private fb: FormBuilder,
    private orgsService: OrganizationsService
  ) {
    this.api.getAssets().subscribe((data) => {
      this.assets.set(data);
    });
  }

  addAsset(asset: any) {
    const orgId = this.orgsService.selectedOrganization()!.id;
    this.api
      .createAsset({
        ...asset,
        organizationId: orgId,
      })
      .pipe(
        switchMap(() => this.api.getAssets()),
        tap((data) => {
          this.assets.set(data);
        })
      )
      .subscribe();
  }

  onAddAssetClicked() {
    if (this.createAssetForm.invalid) {
      return;
    }

    this.addAsset({
      name: this.createAssetForm.value.name!,
    });
  }

  onRemoveAssetClicked(asset: Asset) {
    this.api
      .deleteAsset(asset.id)
      .pipe(
        switchMap(() => this.api.getAssets()),
        tap((data) => {
          this.assets.set(data);
        })
      )
      .subscribe();
  }
}
