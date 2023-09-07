import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
