import { Component } from '@angular/core';
import { MovementsService } from '../../services/movements.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.scss',
})
export class MovementsComponent {
  form = this.fb.group({
    assetId: ['', Validators.required],
    locationId: ['', Validators.required],
    timestamp: ['', Validators.required],
  });

  constructor(
    private movementsService: MovementsService,
    private fb: FormBuilder
  ) {}

  onNowClicked() {
    this.form.controls.timestamp.setValue(new Date().toLocaleTimeString());
  }

  onCreateMovementClicked() {
    if (this.form.invalid) {
      return;
    }

    this.movementsService
      .createMovement({
        assetId: +this.form.value.assetId!,
        locationId: +this.form.value.locationId!,
        timestamp: this.form.value.timestamp!,
      })
      .subscribe();
  }
}
