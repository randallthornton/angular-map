import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './pages/assets/assets.component';
import { MapComponent } from './pages/map/map.component';
import { LocationsComponent } from './pages/locations/locations.component';

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
    path: 'map',
    component: MapComponent,
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
