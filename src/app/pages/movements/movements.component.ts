import { Component, WritableSignal, signal } from '@angular/core';
import { MovementsService } from '../../services/movements.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Movement } from '../../models/movement';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.scss',
})
export class MovementsComponent {
  movements: WritableSignal<Movement[]> = signal([]);
  form = this.fb.group({
    assetId: ['', Validators.required],
    locationId: ['', Validators.required],
    timestamp: ['', Validators.required],
  });

  constructor(
    private movementsService: MovementsService,
    private fb: FormBuilder
  ) {
    this.movementsService
      .getMovements()
      .subscribe((x) => this.movements.set(x));
  }

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
        timestamp: new Date(this.form.value.timestamp!),
      })
      .pipe(
        switchMap(() => this.movementsService.getMovements()),
        tap((x) => this.movements.set(x))
      )
      .subscribe();
  }

  onDeleteMovementClicked(movement: Movement) {
    this.movementsService
      .deleteMovement(movement.id)
      .pipe(
        switchMap(() => this.movementsService.getMovements()),
        tap((x) => this.movements.set(x))
      )
      .subscribe();
  }
}
