import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public resultMessage = '';
  profileForm = new FormGroup({
    password: new FormControl(''),
    passwordConfirmation: new FormControl('')
  });

  constructor(
    private _regiser: RegisterService,
    private _activatedRoute: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() { }

  async changePassword () {
    try {
      if (!this.profileForm.valid) return;
      var code = this._activatedRoute.snapshot.queryParams['code'];
      code = encodeURIComponent(code);
      await this._regiser.changePassword(this.profileForm.value, code).toPromise();
    } catch (error) {
      //this.resultIsError = true;
      this.resultMessage = error.payload.message;
    }
  }

}
