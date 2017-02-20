import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user){
    let messages: String[] = [];
    let success: Boolean = true;
    if(!user.name){
      messages.push('name required');
      success = false;
    }
    if(!user.username){
      messages.push('username required');
      success = false;
    }
    
    if(!user.email){
      messages.push('email required');
      success = false;
    }

    if(!user.password){
      messages.push('password required');
      success = false;
    }
    
    return {
      success: success,
      messages: messages
    };

  }

  validateEmail(email){
    let emailRejx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRejx.test(email)){
      return {
        success: false,
        messages: ['Invalid Email']
      };
    } else {
      return {
        success: true,
        messages: ['Valid Email']
      };
    }
  }

}
