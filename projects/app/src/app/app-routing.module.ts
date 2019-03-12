import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmptyComponent, LoginComponent, RegisterComponent, AuthenticationGuard } from '@abolis/shared-client';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'empty', component: EmptyComponent, canActivate: [AuthenticationGuard]},
      {path: '**', redirectTo: ''},
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

