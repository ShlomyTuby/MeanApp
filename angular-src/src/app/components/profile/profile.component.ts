import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(
    private router:Router,
    private authService:AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe( res => {
      this.user = res.user;
    }, 
    (err) => {
      if(err.status == 401){
        this.flashMessage.show('You are not login', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['login']);
      }
      console.error(err);
      return false;
    });
  }

}
