import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { FlashMessagesService } from 'angular2-flash-messages'
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 
  // local varible
  name: String;
  username: String;
  email: String;
  password: String;


  constructor(
      private validateService: ValidateService,
      private router:Router,
      private flashMessagesService:FlashMessagesService,
      private authService:AuthService
      ) { }

  ngOnInit() {
  }



  onRegisterSubmit(){
    console.log('onRegisterSubmit');
    const user = {
      'name': this.name,
      'username': this.username,
      'email': this.email,
      'password': this.password
    }
    

    // Validate Field
    let validateRegister = this.validateService.validateRegister(user);
    if(!validateRegister.success){
      let errorMessage = '';
      if(validateRegister.messages.length > 0 ){
        errorMessage = validateRegister.messages.join(', ');
      } else {
        errorMessage = 'Invalid Data';
      }
      this.flashMessagesService.show(errorMessage, {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    // Validate Email
    let validateEmail = this.validateService.validateEmail(user.email);
    if(!validateEmail.success){
      let errorMessage = validateEmail.messages.join(', ');
      this.flashMessagesService.show(errorMessage, {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe((res) => {
      console.log(res.success);
      if(res.success){
        this.flashMessagesService.show('Register Successfuly', {
            cssClass: 'alert-success',
            timeout: 5000
          });
        this.router.navigate(['/login']);
      } else {
         this.flashMessagesService.show('Register Faild', {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
    });
    
  } 

}
