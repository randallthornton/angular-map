import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movement } from '../models/movement';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  constructor(private http: HttpClient) {}

  getMovements() {
    return this.http.get<Movement[]>('/api/movements');
  }

  createMovement(movement: any) {
    return this.http.post('/api/movements', movement);
  }
}
