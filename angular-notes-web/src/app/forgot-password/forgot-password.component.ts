import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public resultMessage = '';
  profileForm = new FormGroup({
    email: new FormControl('')
  });

  constructor(
    private _regiser: RegisterService,
    private _router: Router
  ) { }

  ngOnInit() {}

  async forgotPassword () {
    console.log(this.profileForm.value);
    try {
      if (!this.profileForm.valid) return;
      await this._regiser.recoverPassword(this.profileForm.value).toPromise();
    } catch (error) {
      //this.resultIsError = true;
      this.resultMessage = error.payload.message;
    }
  }

}
