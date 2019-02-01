import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmptyComponent } from '@abolis/shared-client';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'empty', component: EmptyComponent},
      {path: '**', redirectTo: ''},
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

