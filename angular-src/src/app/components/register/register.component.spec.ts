/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { Router, RouterModule, Route } from '@angular/router'
import { HttpModule } from '@angular/http';
import { RegisterComponent } from '../register/register.component';
import { APP_BASE_HREF } from '@angular/common';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service'

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

const appRoute: Route[] = [
];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [HttpModule, FormsModule, RouterModule.forRoot(appRoute), FlashMessagesModule],
      providers: [AuthService, ValidateService, { provide: APP_BASE_HREF, useValue: '/' } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
