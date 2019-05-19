import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';
 
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public resultMessage = '';
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    userName: new FormControl(''),
    passwordConfirmation: new FormControl(''),
    phoneNumber: new FormControl('')
  });
  constructor(private _regiser: RegisterService) { }

  ngOnInit() {
  }
  //let result = {"message": ""}; 
  async register() {
    try {
      if (!this.profileForm.valid) return;
      let result = await this._regiser.create(this.profileForm.value).toPromise();
      this.resultMessage = JSON.stringify(result);
      
      console.log(this.resultMessage);
      /*this.resultMessage =
        'You have registered your account. Check your email for further instructions on how to activate it.';*/
    } catch (error) {
      this.resultMessage = error.payload.message;
    }
  }

}
