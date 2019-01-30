import { Component } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public toasterconfig: ToasterConfig = new ToasterConfig({
    mouseoverTimerStop: false
  });
}
