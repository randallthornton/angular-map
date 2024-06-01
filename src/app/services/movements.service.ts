import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateMovementDto, Movement } from '../models/movement';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  constructor(private http: HttpClient) {}

  getMovements() {
    return this.http.get<Movement[]>('/api/movements');
  }

  createMovement(movement: CreateMovementDto) {
    return this.http.post<Movement>('/api/movements', movement);
  }
  
  deleteMovement(id: number) {
    return this.http.delete(`/api/movements/${id}`);
  }
}
