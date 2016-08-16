import 'es6-shim';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import './style.css';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule).catch((error) => {
    console.log('error', error);
});

