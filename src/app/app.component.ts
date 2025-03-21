import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = `electron-angular-app ${(window as any).electron.version()}`;
  constructor() {
    console.log("AppComponent initialized", window);
  }
}
