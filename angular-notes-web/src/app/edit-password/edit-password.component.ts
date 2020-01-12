import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { ProfileService } from '../profile.service';
import { SessionService } from '../session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  public resultMessage = '';
  public passwordOld = '';
  public password = '';
  public passwordConfirmation = '';

  passwordForm = new FormGroup({
    passwordOld: new FormControl(''),
    password: new FormControl(''),
    passwordConfirmation: new FormControl('')
  });

  constructor(
    private _sessionService: SessionService,
    private _profile: ProfileService,
    private _activatedRoute: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {}
  async editPassword () {
    try {
      if (!this.passwordForm.valid) return;
      await this._sessionService.jwt$.pipe(switchMap(
        token => this._profile.editPassword(this.passwordForm.value, token || '')))
        .subscribe(() => {
          this.passwordOld = '';
          this.password = '';
          this.passwordConfirmation = '';
        });

    } catch (error) {
      //this.resultIsError = true;
      this.resultMessage = error.payload.message;
    }
  }

}
