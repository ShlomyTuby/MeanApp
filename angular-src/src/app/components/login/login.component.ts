import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe( (res) => {
       if(res.success){
          this.authService.storeUserData(res.token, res.user);
          this.router.navigate(['dashboard']);
          this.flashMessage.show('Login Sucsessfuly', { cssClass: 'alert-success', timeout: 3000 });
       } else {
         this.flashMessage.show('Login Failed, ' + res.message, { cssClass: 'alert-danger', timeout: 3000 });
       }
    }, (err) => {
      this.flashMessage.show('Login Failed, ' + err.message, { cssClass: 'alert-danger', timeout: 3000 });
    });
  }


}
