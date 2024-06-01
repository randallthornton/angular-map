import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './pages/assets/assets.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { LeafletMapComponent } from './pages/leaflet-map/leaflet-map.component';
import { MovementsComponent } from './pages/movements/movements.component';

const routes: Routes = [
  {
    path: 'assets',
    component: AssetsComponent,
  },
  {
    path: 'locations',
    component: LocationsComponent,
  },
  {
    path: 'movements',
    component: MovementsComponent,
  },
  {
    path: 'map',
    component: LeafletMapComponent,
  },
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
