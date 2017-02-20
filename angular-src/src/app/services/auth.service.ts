import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt'

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  baseURL: String;
  baseHeaders: Headers;

  constructor(
    private http:Http
  ) { 
    this.baseURL = 'http://localhost:3000/';
    this.baseHeaders = new Headers();
    this.baseHeaders.append('Content-Type', 'application/json');
  }

  registerUser(user){
    let headers = this.baseHeaders;
    let url = this.baseURL + 'users/register';
    return this.http.post(url, user, {
      headers: headers
    }).map( res => res.json() );
  }

  authenticateUser(user){
    let headers =  this.baseHeaders;
    let url = this.baseURL + 'users/authenticate';
    return this.http.post(url, user, {
      headers: headers
    }).map( res => res.json() );
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    let url = this.baseURL + 'users/profile';
    return this.http.get(url, {
      headers: headers
    }).map( res => res.json() );
  }
  
  storeUserData(token, user){
    if(token){
      localStorage.setItem('id_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
    } else {
      this.logout();
    }
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return tokenNotExpired();
  }

  logout(){
    this.user = null;
    this.authToken = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
  }

}
