import { Asset } from './asset';
import { Location } from './location';

export interface Movement {
  id: number;
  assetId: number;
  locationId: number;
  timestamp: string;
  location: Location;
  asset: Asset;
}

export interface CreateMovementDto {
  assetId: number;
  locationId: number;
  timestamp: Date;
}
