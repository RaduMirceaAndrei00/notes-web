import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  public resultMessage = '';
  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private _regiser: RegisterService,
    private _sessionService: SessionService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  async login () {
    try {
      if (!this.profileForm.valid) return;
      const result: any = await this._regiser.authenticate(this.profileForm.value).toPromise();
      const token = result.token;
      this._sessionService.setJwt(token);
      this._router.navigateByUrl('/notes');
    } catch (error) {
      //this.resultIsError = true;
      this.resultMessage = error.payload.message;
    }
  }

}
