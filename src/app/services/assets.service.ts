import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  constructor(private http: HttpClient) {}

  getAssets() {
    return this.http.get<Asset[]>('/api/assets');
  }

  createAsset(body: any) {
    return this.http.post<Asset>('/api/assets', body);
  }
}
