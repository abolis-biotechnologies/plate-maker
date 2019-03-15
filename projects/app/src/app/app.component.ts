import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
import { AuthenticationService } from '@abolis/shared-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  username: string;

  public toasterconfig: ToasterConfig = new ToasterConfig({
    mouseoverTimerStop: false
  });

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.usernameSubject.subscribe(username => setTimeout(() => this.username = username, 0));
  }

}
