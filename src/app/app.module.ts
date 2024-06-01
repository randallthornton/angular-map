import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { GoogleMapsModule } from '@angular/google-maps';
import { AssetsComponent } from './pages/assets/assets.component';
import { MapComponent } from './pages/map/map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // Import the MatButtonModule module
import { provideHttpClient } from '@angular/common/http';
import { LocationsComponent } from './pages/locations/locations.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LeafletMapComponent } from './pages/leaflet-map/leaflet-map.component';
import { MovementsComponent } from './pages/movements/movements.component';
@NgModule({
  declarations: [
    AppComponent,
    AssetsComponent,
    MapComponent,
    LocationsComponent,
    LeafletMapComponent,
    MovementsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: Navigator,
      useValue: navigator,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
