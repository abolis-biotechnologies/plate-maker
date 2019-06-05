import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CreatePlateAppComponent } from './create-plate-app/create-plate-app.component';
import { DisplayPlateAppComponent } from './display-plate-app/display-plate-app.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: CreatePlateAppComponent},
      {path: 'displayPlate', component: DisplayPlateAppComponent},
      {path: '**', redirectTo: ''},
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
