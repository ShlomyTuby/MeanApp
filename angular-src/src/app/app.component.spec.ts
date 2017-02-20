/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RouterModule, Route } from '@angular/router';

import { ValidateService } from './services/validate.service';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';
import { AuthService } from './services/auth.service'
import { FormsModule } from '@angular/forms';


import { NavbarComponent } from './components/navbar/navbar.component';

describe('AppComponent', () => {
  const appRoute: Route[] = [];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      imports: [HttpModule, FormsModule, RouterModule.forRoot(appRoute), FlashMessagesModule],
      providers: [AuthService, ValidateService, { provide: APP_BASE_HREF, useValue: '/' } ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'MEAN App!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('MEAN App!');
  }));

});
