import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { ControlsComponent } from './buildingInfo/controls.component'
import { AboutComponent } from './about/about.component'

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Controls']">Controls</a>
      <a [routerLink]="['About']">About</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS
  ],
  styleUrls: ['app/app.component.css']
})

@RouteConfig([
  {
    path: '/controls',
    name: 'Controls',
    component: ControlsComponent,
    useAsDefault: true
  },{
    path: '/about',
    name: 'About',
    component: AboutComponent
  }

])

export class AppComponent {
	title = 'Should you buy it?';
}